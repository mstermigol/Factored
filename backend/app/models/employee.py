from sqlalchemy import Column, Integer, String, Text, JSON
from db.database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    last_name = Column(String, index=True)
    position = Column(String, index=True)
    description = Column(Text, index=True)
    skills = Column(JSON, index=True)
    username = Column(String, unique=True , index=True)
    password = Column(String)