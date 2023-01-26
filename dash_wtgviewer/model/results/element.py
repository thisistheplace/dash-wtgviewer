# Element results
from .base import Base, BaseResult

class ElementResult(Base):
    target: str # the id of the element this result is associated with
    results: list[BaseResult] # in node order