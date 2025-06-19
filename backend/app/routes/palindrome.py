from fastapi import APIRouter, HTTPException, Query
from datetime import datetime
from app.db.mongo import db
from app.models.check_model import CheckInput, CheckOutput

router = APIRouter()

@router.post("/palindrome", response_model=CheckOutput)
async def check_palindrome(payload: CheckInput):
    text = payload.text.strip()

    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    if len(text) > 20:
        raise HTTPException(status_code=400, detail="Input exceeds 20 character limit")

    cleaned = ''.join(filter(str.isalnum, text.lower()))
    is_palindrome = cleaned == cleaned[::-1]

    record = {
        "input": text,
        "isPalindrome": is_palindrome,
        "timestamp": datetime.utcnow()
    }

    try:
        await db.checks.insert_one(record)
        return { "input": text, "isPalindrome": is_palindrome }
    except:
        raise HTTPException(status_code=500, detail="DB insert failed")


@router.get("/history")
async def get_history(limit: int = Query(5, le=50)):
    try:
        results = await db.checks.find().sort("timestamp", -1).to_list(length=limit)
        for item in results:
            item["_id"] = str(item["_id"])
        return results
    except:
        raise HTTPException(status_code=500, detail="DB fetch failed")
