from .base import Base
from .fea.elements import ElementSet


class Nacelle(Base):
    element_sets: list[ElementSet]
