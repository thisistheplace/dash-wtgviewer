from .base import Base
from .fea.elements import ElementSet


class Foundation(Base):
    name: str = "foundation"
    element_set: ElementSet
