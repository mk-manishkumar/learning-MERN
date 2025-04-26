from fastapi import FastAPI
from .routes import router as note_router

app = FastAPI(
    title="Notes API",
    description="A simple Notes application. Visit `/docs` for API documentation.",
    version="1.0.0",
)


@app.get("/", tags=["Root"])
async def root() -> dict:
    return {"message": "Welcome to the Notes API! Use the /docs endpoint to explore the API."}

app.include_router(note_router, prefix="/note", tags=["Notes"])
