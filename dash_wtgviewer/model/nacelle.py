from .base import Base
from .fea.elements import Cuboid


class Nacelle(Base):
    geometry: Cuboid
