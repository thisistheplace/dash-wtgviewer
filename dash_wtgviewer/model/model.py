from .base import Base
from .blade import Blade
from .foundation import Foundation
from .hub import Hub
from .nacelle import Nacelle
from .tower import Tower


class Model(Base):
    foundation: Foundation
    tower: Tower
    nacelle: Nacelle
    hub: Hub
    blades: list[Blade]


if __name__ == "__main__":
    a = Model(name="test")
