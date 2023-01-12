from .base import NodeBase
from ..base import Base


class Node(NodeBase):
    x: float
    y: float
    z: float


class NodeSet(Base):
    nodes: list[Node]
