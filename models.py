from sqlalchemy import Column, Integer, String, TIMESTAMP
from app.database import Base
from sqlalchemy.sql import func

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(100))
    product_name = Column(String(100))
    status = Column(String(50))
    updated_at = Column(TIMESTAMP, server_default=func.now())