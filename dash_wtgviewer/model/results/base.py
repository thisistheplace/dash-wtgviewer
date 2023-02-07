from pydantic import BaseModel, validator
import uuid

class Base(BaseModel):
    id: str | None = None

    @validator("id", pre=True, always=True)
    def set_id_now(cls, v):
        return v or str(uuid.uuid4())

class BaseResult(BaseModel):
    value: float