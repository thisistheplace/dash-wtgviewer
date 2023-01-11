from pydantic import BaseModel, validator, ValidationError

NODE_REGISTER = set([])
ELEMENT_REGISTER = set([])


def register(id: int, register: set[int]):
    if id in register:
        varname = f"{register=}".split("=")[0]
        raise ValidationError(f"id: {id} was already registered in {varname}")
    register.add(id)


class NodeBase(BaseModel):
    id: int | None

    @validator("id", pre=True, always=True)
    def set_id_now(cls, v):
        try:
            id = v or max(NODE_REGISTER) + 1
        except ValueError:
            id = 0
        register(id, NODE_REGISTER)
        return id


class ElementBase(BaseModel):
    id: int | None

    @validator("id", pre=True, always=True)
    def set_id_now(cls, v):
        try:
            id = v or max(ELEMENT_REGISTER) + 1
        except ValueError:
            id = 0
        register(id, ELEMENT_REGISTER)
        return id
