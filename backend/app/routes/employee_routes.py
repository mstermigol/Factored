from fastapi import APIRouter, Header, Depends
from sqlalchemy.orm import Session
from controllers.employee_controller import index, register, show, update
from schemas.employee_schema import EmployeeCreate, EmployeeResponse, EmployeeUpdate
from db.database import get_db
from utils.auth_utils import verify_credentials

router = APIRouter(prefix="/employees")

@router.get("/", response_model=list[EmployeeResponse])
def employee_index(db: Session = Depends(get_db), _: None = Depends(verify_credentials)):
    return index(db)

@router.get("/{employee_id}", response_model=EmployeeResponse)
def employee_show(employee_id: int, db: Session = Depends(get_db), _: None = Depends(verify_credentials)):
    return show(employee_id, db)

@router.post("/register", response_model=EmployeeResponse)
def employee_register(employee: EmployeeCreate, db: Session = Depends(get_db)):
    return register(employee, db)

@router.post("/login", response_model=EmployeeResponse)
def employee_login(username: str = Header(...), password: str = Header(...), db: Session = Depends(get_db)):
    employee = verify_credentials(username, password, db)
    return EmployeeResponse.from_orm(employee)

@router.put("/update/{employee_id}", response_model=EmployeeResponse)
def employee_update(employee_id: int, employee: EmployeeUpdate, db: Session = Depends(get_db), requester: EmployeeResponse = Depends(verify_credentials)):
    return update(employee_id, employee, db, requester)