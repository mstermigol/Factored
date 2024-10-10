from pydantic import BaseModel
from typing import List, Dict

class EmployeeBase(BaseModel):
    name: str
    last_name: str
    position: str
    description: str
    skills: List[Dict[str, float]]

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeResponse(EmployeeBase):
    id: int

    class Config:
        from_attributes = True
