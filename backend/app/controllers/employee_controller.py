from fastapi import HTTPException, Header, Depends
from sqlalchemy.orm import Session
from models.employee import Employee
from schemas.employee_schema import EmployeeCreate, EmployeeResponse, EmployeeUpdate
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
        return EmployeeResponse.from_orm(db_employee)
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
    return EmployeeResponse.from_orm(employee)

def update(employee_id: int, employee: EmployeeUpdate, db: Session, requester: Employee):
    
    if requester.id != employee_id:
        raise HTTPException(status_code=403, detail="You are not allowed to update this employee.")

    db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")

    try:
        db_employee.name = employee.name
        db_employee.last_name = employee.last_name
        db_employee.position = employee.position
        db_employee.description = employee.description
        
        db_employee.skills = [{'name': skill.name, 'proficiency': skill.proficiency} for skill in employee.skills]

        db.commit()

        return EmployeeResponse.from_orm(db_employee)

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred while updating the employee: {str(e)}")