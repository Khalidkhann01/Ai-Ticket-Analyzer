from sqlalchemy import Column, Integer, String, DateTime
from database import Base
from datetime import datetime

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    
    # Customer fields
    customer_name = Column(String, nullable=True)
    customer_email = Column(String, nullable=True)
    customer_phone = Column(String, nullable=True)
    
    # Ticket fields
    message = Column(String)
    category = Column(String)
    priority = Column(String)
    response = Column(String)
    
    # Timestamp
    created_at = Column(DateTime, default=datetime.utcnow)