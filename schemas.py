from pydantic import BaseModel

class OrderCreate(BaseModel):
    customer_name: str
    product_name: str
    status: str

class OrderResponse(BaseModel):
    id: int
    customer_name: str
    product_name: str
    status: str

    class Config:
        from_attributes = True