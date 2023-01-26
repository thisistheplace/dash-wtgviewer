from pydantic import BaseModel

from .base import Base
from .foundation import Foundation
from .nacelle import Nacelle
from .rotor import Rotor
from .tower import Tower


class Model(Base):
    foundation: Foundation
    tower: Tower
    nacelle: Nacelle
    rotor: Rotor

def find_type(model: Model, search: BaseModel) -> list[BaseModel]:
    """Traverse a nested model and find all unique instances of search"""
    store = []
    if isinstance(model, search):
        store.append(model)
    for _, nested_model in model:
        if isinstance(nested_model, search):
            store.append(nested_model)
        elif isinstance(nested_model, BaseModel):
            store += find_type(nested_model, search)
        elif isinstance(nested_model, list):
            for listed_model in nested_model:
                if isinstance(listed_model, BaseModel):
                    store += find_type(listed_model, search)
    return store

if __name__ == "__main__":
    a = Model(name="test")
