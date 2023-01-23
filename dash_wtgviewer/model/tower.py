from .base import Base
from .fea.elements import ElementSet


class Tower(Base):
    name: str = "tower"
    element_set: ElementSet
