from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(title="AI Agent Service")

app.include_router(router)

# Run:
# uvicorn app.main:app --reload --port 8000
