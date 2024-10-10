from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from controllers.employee_controller import index, create, show
from schemas.employee_schema import EmployeeCreate, EmployeeResponse
from db.database import get_db

router = APIRouter()

@router.get("/employees", response_model=list[EmployeeResponse])
def employee_index(db: Session = Depends(get_db)):
    return index(db)

@router.post("/employees", response_model=EmployeeResponse)
def employee_create(employee: EmployeeCreate, db: Session = Depends(get_db)):
    return create(employee, db)

@router.get("/employees/{employee_id}", response_model=EmployeeResponse)
def employee_show(employee_id: int, db: Session = Depends(get_db)):
    return show(employee_id, db)
