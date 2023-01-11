from .base import Base
from .fea.nodes import NodeSet
from .fea.elements import ElementSet


class Foundation(Base):
    node_sets: list[NodeSet]
    element_sets: list[ElementSet]
