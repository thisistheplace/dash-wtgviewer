from pydantic import BaseModel, validator
from typing import Optional

# Both registers will start at index = 1
NODE_REGISTER = set([])
ELEMENT_REGISTER = set([])


def register(id: int, register: set[int]):
    # if id in register:
    #     varname = f"{register=}".split("=")[0]
    #     raise ValueError(f"id: {id} was already registered in {varname}")
    register.add(id)


class NodeBase(BaseModel):
    id: Optional[int]

    @validator("id", pre=True, always=True)
    def set_id_now(cls, v):
        try:
            id = v or max(NODE_REGISTER) + 1
        except ValueError:
            id = 1
        register(id, NODE_REGISTER)
        return id


class ElementBase(BaseModel):
    id: int | None

    @validator("id", pre=True, always=True)
    def set_id_now(cls, v):
        try:
            id = v or max(ELEMENT_REGISTER) + 1
        except ValueError:
            id = 1
        register(id, ELEMENT_REGISTER)
        return id
