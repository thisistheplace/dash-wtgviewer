from .base import Base
from .fea.nodes import NodeSet
from .fea.elements import ElementSet


class Foundation(Base):
    node_sets: dict[str, NodeSet]
    element_sets: dict[str, ElementSet]
