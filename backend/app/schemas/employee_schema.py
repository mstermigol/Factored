from pydantic import BaseModel
from typing import List

class Skill(BaseModel):
    name: str
    proficiency: float

class EmployeeBase(BaseModel):
    name: str
    last_name: str
    position: str
    description: str
    skills: List[Skill]

class EmployeeCreate(EmployeeBase):
    username: str
    password: str
class EmployeeResponse(EmployeeBase):
    id: int
    username: str

    class Config:
        from_attributes = True
