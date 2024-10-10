from fastapi import HTTPException, Header, Depends, status, Response
from sqlalchemy.orm import Session
from models.employee import Employee
from schemas.employee_schema import EmployeeCreate, EmployeeResponse
from utils.auth_utils import verify_credentials
from typing import List
from sqlalchemy.exc import IntegrityError


def index(db: Session):
    employees = db.query(Employee).all()
    return [EmployeeResponse.from_orm(emp) for emp in employees]

def register(employee: EmployeeCreate, db: Session):
    db_employee = Employee(**employee.dict())
    try:
        db.add(db_employee)
        db.commit()
        db.refresh(db_employee)
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    except IntegrityError:
        db.rollback()
        raise ValueError("Employee already exists")

def show(employee_id: int, db: Session):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return EmployeeResponse.from_orm(employee)

def login(authorization: str, db: Session):
    employee = verify_credentials(authorization, db)
    return Response(status_code=status.HTTP_204_NO_CONTENT)