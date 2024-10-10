from fastapi import FastAPI
from db.database import Base, engine
from urls.employee_urls import router as employee_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(employee_router)
