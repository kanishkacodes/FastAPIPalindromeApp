from fastapi import FastAPI
from app.routes.palindrome import router as palindrome_router

app = FastAPI()

@app.get("/")
async def root():
    return {"status": "API running"}

app.include_router(palindrome_router, prefix="/api")
