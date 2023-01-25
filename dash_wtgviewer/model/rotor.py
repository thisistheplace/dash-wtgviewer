from .base import Base
from .blade import Blade
from .hub import Hub
from .fea.nodes import Node


class Rotor(Base):
    name: str = "rotor"
    blades: list[Blade]
    hub: Hub
    node: Node
