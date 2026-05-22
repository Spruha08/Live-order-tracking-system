from fastapi import FastAPI, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session

from app.database import SessionLocal, engine
from app.models import Base, Order
from app.schemas import OrderCreate
from app.websocket_manager import manager
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

#CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


# Database Connection Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Home Route
@app.get("/")
def home():
    return {"message": "Live Order Tracking System Running"}


# Get All Orders
@app.get("/orders")
def get_orders(db: Session = Depends(get_db)):
    orders = db.query(Order).all()
    return orders


# Create New Order
@app.post("/orders")
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    new_order = Order(
    customer_name=order.customer_name,
    product_name=order.product_name,
    status=order.status
)

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return new_order

@app.put("/orders/{order_id}")
def update_order(order_id: int, status: str, db: Session = Depends(get_db)):

    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        return {"message": "Order not found"}

    order.status = status

    db.commit()

    import asyncio
    asyncio.run(manager.broadcast(f"Order {order.id} status updated to {status}"))

    db.refresh(order)

    return {
        "message": "Order updated successfully",
        "data": order
    }

@app.delete("/orders/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):

    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        return {"message": "Order not found"}

    db.delete(order)
    db.commit()

    return {"message": "Order deleted successfully"}

#Websocket Endpoint for Real-time Updates
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    await manager.connect(websocket)

    try:
        while True:
            await websocket.receive_text()

    except WebSocketDisconnect:
        manager.disconnect(websocket)