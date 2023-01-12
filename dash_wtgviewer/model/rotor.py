from .base import Base
from .blade import Blade
from .hub import Hub
from .fea.nodes import Node


class Rotor(Base):
    blades: list[Blade]
    hub: Hub
    node: Node