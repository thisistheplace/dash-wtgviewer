from .base import Base
from .element import ElementResult

class Results(Base):
    element_results: list[ElementResult]