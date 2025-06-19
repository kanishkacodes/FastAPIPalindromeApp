from pydantic import BaseModel

class CheckInput(BaseModel):
    text: str

class CheckOutput(BaseModel):
    input: str
    isPalindrome: bool
