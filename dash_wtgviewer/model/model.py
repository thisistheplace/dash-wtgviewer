from .base import Base
from .foundation import Foundation
from .nacelle import Nacelle
from .rotor import Rotor
from .tower import Tower


class Model(Base):
    foundation: Foundation
    tower: Tower
    nacelle: Nacelle
    rotor: Rotor


if __name__ == "__main__":
    a = Model(name="test")
