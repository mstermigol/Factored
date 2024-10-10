from fastapi import FastAPI
from db.database import Base, engine
from routes.employee_routes import router as employee_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(employee_router, prefix="/api")
