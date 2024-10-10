from fastapi import HTTPException, Header, Depends
from sqlalchemy.orm import Session
from models.employee import Employee
from db.database import get_db

def verify_credentials(username: str = Header(...), password: str = Header(...), db: Session = Depends(get_db)):
    if not username or not password:
        raise HTTPException(status_code=400, detail="Both 'username' and 'password' must be provided.")

    employee = db.query(Employee).filter(Employee.username == username).first()

    if employee is None or employee.password != password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
