from enum import Enum
from pydantic import root_validator, Field, validator

from .base import ElementBase
from .nodes import Node
from ..base import Base


class ElementType(Enum):
    tube = "tube"
    conicaltube = "conicaltube"
    cuboid = "cuboid"
    cone = "cone"


NUM_ELEMENT_NODES = {
    ElementType.tube: 2,
    ElementType.conicaltube: 2,
    ElementType.cuboid: 2,
    ElementType.cone: 2,
}


class Element(ElementBase):
    eltype: ElementType
    nodes: list[Node]

    @root_validator
    def check_number_of_nodes(cls, values):
        eltype, nodes = values.get("eltype"), values.get("nodes")
        if len(nodes) != NUM_ELEMENT_NODES[eltype]:
            raise ValueError(
                f"Element of type {eltype} should have {NUM_ELEMENT_NODES[eltype]} nodes, not {len(nodes)}"
            )
        return values


class Tube(Element):
    eltype: ElementType = Field(ElementType.tube, const=True)
    diameter: float
    thickness: float


class ConicalTube(Element):
    eltype: ElementType = Field(ElementType.conicaltube, const=True)
    diameters: list[float]
    thicknesses: list[float]

    @validator("diameters", pre=True, always=True)
    def set_diameters_now(cls, diameters):
        if len(diameters) != 2:
            raise ValueError(
                f"Conical sections must have 2 diameters, not {len(diameters)} "
            )
        return diameters

    @validator("thicknesses", pre=True, always=True)
    def set_thicknesses_now(cls, thicknesses):
        if len(thicknesses) != 2:
            raise ValueError(
                f"Conical sections must have 2 thicknesses, not {len(thicknesses)} "
            )
        return thicknesses


class Cuboid(Element):
    eltype: ElementType = Field(ElementType.cuboid, const=True)
    width: float
    height: float


class Cone(Element):
    eltype: ElementType = Field(ElementType.cone, const=True)
    diameter: float


ELEMENT_BUILDER = {
    ElementType.tube: Tube,
    ElementType.conicaltube: ConicalTube,
    ElementType.cuboid: Cuboid,
    ElementType.cone: Cone,
}


class ElementSet(Base):
    elements: list[Element]

    @validator("elements", pre=True, always=True)
    def select_element_type(cls, values):
        elements = []
        for el in values:
            if isinstance(el, Element):
                elements.append(el)
            else:
                # Loading from dict
                eltype = el.get("eltype")
                elements.append(ELEMENT_BUILDER[ElementType[eltype]](**el))
        return elements
