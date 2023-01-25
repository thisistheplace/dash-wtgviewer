from .base import Base
from .fea.elements import Cone


class Hub(Base):
    name: str = "hub"
    cone: Cone
