from enum import Enum
from pydantic import root_validator, ValidationError, Field

from .base import ElementBase
from .nodes import Node
from ..base import Base
from ..geometry import Vector3


class ElementType(Enum):
    tube = "tube"
    cuboid = "cuboid"
    cone = "cone"


NUM_ELEMENT_NODES = {ElementType.tube: 2, ElementType.cuboid: 2, ElementType.cone: 2}


class Element(ElementBase):
    eltype: ElementType
    nodes: dict[int, Node]
    axis: Vector3

    @root_validator
    def check_number_of_nodes(cls, values):
        eltype, nodes = values.get("eltype"), values.get("nodes")
        if len(nodes) != NUM_ELEMENT_NODES[eltype]:
            raise ValidationError(
                f"Element of type {eltype} should have {NUM_ELEMENT_NODES[eltype]} nodes, not {len(nodes)}"
            )
        return values


class Tube(Element):
    eltype: ElementType = Field(ElementType.tube, const=True)
    diameter: float
    thickness: float


class Cuboid(Element):
    eltype: ElementType = Field(ElementType.cuboid, const=True)
    width: float
    height: float


class Cone(Element):
    eltype: ElementType = Field(ElementType.cone, const=True)
    diameter: float


class ElementSet(Base):
    elements: dict[int, Element]
