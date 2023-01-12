from .base import Base
from .fea.nodes import NodeSet
from .fea.elements import ElementSet


class Tower(Base):
    element_sets: list[ElementSet]
