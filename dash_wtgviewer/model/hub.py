from .base import Base
from .fea.elements import Cone


class Nacelle(Base):
    cone: Cone
