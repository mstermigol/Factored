from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.employee import Employee
from schemas.employee_schema import EmployeeCreate, EmployeeResponse
from typing import List

def index(db: Session) -> List[EmployeeResponse]:
    employees = db.query(Employee).all()
    return [EmployeeResponse.from_orm(emp) for emp in employees]

def create(employee: EmployeeCreate, db: Session) -> EmployeeResponse:
    db_employee = Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return EmployeeResponse.from_orm(db_employee)

def show(employee_id: int, db: Session) -> EmployeeResponse:
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return EmployeeResponse.from_orm(employee)
