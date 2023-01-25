import math
import json

from dash_wtgviewer.model import Model, Foundation, Blade, Nacelle, Rotor, Hub, Tower
from dash_wtgviewer.model.fea.elements import (
    Tube,
    Cuboid,
    Cone,
    ElementSet,
    ConicalTube,
)
from dash_wtgviewer.model.fea.nodes import Node
from dash_wtgviewer.model.geometry.vectors import Vector3

BLADE_URL = "assets/models/blade.glb"

BOTTOM = -40
TOP = 5

HEIGHT = TOP - BOTTOM

TP_HEIGHT = 5

BOTTOM_WIDTH = 20
TOP_WIDTH = 10

HUB_LENGTH = 5
HUB_DIAMETER = 5

BOTTOM_TOWER_DIAMETER = 5
TOP_TOWER_DIAMETER = 2.5
TOWER_HEIGHT = 80
NUM_TOWER_ELEMENTS = 10

BLADE_LENGTH = 60

NACELLE_LENGTH = 8
NACELLE_WIDTH = 4
NACELLE_HEIGHT = 4

BAYS = 3

LEGS = 4

SEGMENTS = 4

# ratio of bottom to top based on the number of bays we're at

nodes = {
    idx: Node(
        id=idx,
        x=(
            BOTTOM_WIDTH
            - ((BOTTOM_WIDTH - TOP_WIDTH) / BAYS) * math.floor((idx - 1) / LEGS)
        )
        / 2
        * (1 if ((idx - 1) % LEGS) / LEGS < 0.5 else -1),
        y=(
            BOTTOM_WIDTH
            - ((BOTTOM_WIDTH - TOP_WIDTH) / BAYS) * math.floor((idx - 1) / LEGS)
        )
        / 2
        * (1 if (idx % LEGS) / 4 < 0.5 else -1),
        z=BOTTOM + math.floor(((idx - 1) / LEGS)) * HEIGHT / BAYS,
    )
    for idx in range(1, LEGS * (BAYS + 1) + 1)
}

forward_braces = {
    idx: Tube(
        id=idx,
        nodes=[nodes[idx], nodes[idx + LEGS + 1 if idx % LEGS != 0 else idx + 1]],
        diameter=0.6,
        thickness=0.01,
    )
    for idx in range(1, (LEGS * BAYS) + 1)
}

start_idx = max(list(forward_braces.keys()))
backward_braces = {
    start_idx
    + idx: Tube(
        id=start_idx + idx,
        nodes=[
            nodes[idx],
            nodes[idx + LEGS - 1 if idx % LEGS != 1 else idx + 2 * LEGS - 1],
        ],
        diameter=0.6,
        thickness=0.01,
    )
    for idx in range(1, LEGS * BAYS + 1)
}

start_idx = max(list(backward_braces.keys()))
chords = {
    start_idx
    + idx: Tube(
        id=start_idx + idx,
        nodes=[nodes[idx], nodes[idx + LEGS]],
        diameter=1.2,
        thickness=0.03,
    )
    for idx in range(1, LEGS * BAYS + 1)
}

# Combine elements
foundation_elements = {}
foundation_elements.update(forward_braces)
foundation_elements.update(backward_braces)
foundation_elements.update(chords)

# Create TP
tp = max(list(foundation_elements.keys())) + 1
foundation_elements[tp] = Tube(
    id=tp,
    nodes=[
        Node(id=tp + 1000, x=0, y=0, z=TOP),
        Node(id=tp + 1001, x=0, y=0, z=TOP + TP_HEIGHT / 5),
    ],
    diameter=math.sqrt(2 * (TOP_WIDTH) ** 2) * 1.2,
    thickness=TOP_WIDTH,
)
foundation_elements[tp + 1] = Tube(
    id=tp + 1,
    nodes=[Node(x=0, y=0, z=TOP + TP_HEIGHT / 5), Node(x=0, y=0, z=TOP + TP_HEIGHT)],
    diameter=BOTTOM_TOWER_DIAMETER,
    thickness=0.02,
)

foundation = Foundation(
    element_set=ElementSet(
        name="foundation", elements=list(foundation_elements.values())
    )
)

# Tower
tower_elements = [
    ConicalTube(
        nodes=[
            Node(x=0, y=0, z=TOP + TP_HEIGHT + TOWER_HEIGHT * idx / NUM_TOWER_ELEMENTS),
            Node(
                x=0,
                y=0,
                z=TOP + TP_HEIGHT + TOWER_HEIGHT * (idx + 1) / NUM_TOWER_ELEMENTS,
            ),
        ],
        diameters=[
            BOTTOM_TOWER_DIAMETER
            - (BOTTOM_TOWER_DIAMETER - TOP_TOWER_DIAMETER) * idx / NUM_TOWER_ELEMENTS,
            BOTTOM_TOWER_DIAMETER
            - (BOTTOM_TOWER_DIAMETER - TOP_TOWER_DIAMETER)
            * (idx + 1)
            / NUM_TOWER_ELEMENTS,
        ],
        thicknesses=[0.01, 0.01],
    )
    for idx in range(NUM_TOWER_ELEMENTS)
]
tower = Tower(element_set=ElementSet(name="tower", elements=tower_elements))

# Blades
blades = [
    Blade(
        name=f"Blade_{idx}",
        url=BLADE_URL,
        node=Node(
            x=NACELLE_LENGTH / 2,
            y=NACELLE_WIDTH / 2,
            z=TOP + TOWER_HEIGHT + TP_HEIGHT + NACELLE_HEIGHT / 2,
        ),
        scale=Vector3(x=5, y=2, z=2),
    )
    for idx in range(1, 4)
]

hub = Hub(
    cone=Cone(
        nodes=[
            Node(
                x=-HUB_LENGTH - NACELLE_LENGTH / 2,
                y=0,
                z=TOP + TOWER_HEIGHT + TP_HEIGHT + NACELLE_HEIGHT / 2,
            ),
            Node(x=-NACELLE_LENGTH / 2, y=0, z=TOP + TOWER_HEIGHT + TP_HEIGHT + NACELLE_HEIGHT / 2),
        ],
        diameter=HUB_DIAMETER,
    )
)

rotor = Rotor(
    blades=blades,
    hub=hub,
    node=Node(
        x=HUB_LENGTH / 4 + NACELLE_LENGTH / 2,
        y=0,
        z=TOP + TOWER_HEIGHT + TP_HEIGHT + NACELLE_HEIGHT / 2,
    ),
)

nacelle = Nacelle(
    element=Cuboid(
        nodes=[
            Node(x=HUB_LENGTH / 4 + NACELLE_LENGTH / 2, y=0, z=TOP + TOWER_HEIGHT + TP_HEIGHT + NACELLE_HEIGHT / 2),
            Node(x=HUB_LENGTH / 4 - NACELLE_LENGTH / 2, y=0, z=TOP + TOWER_HEIGHT + TP_HEIGHT + NACELLE_HEIGHT / 2),
        ],
        width=NACELLE_WIDTH,
        height=NACELLE_HEIGHT,
    )
)

# Create model
model = Model(
    name="model", foundation=foundation, nacelle=nacelle, rotor=rotor, tower=tower
)

with open("assets/ea1_model.json", "w") as f:
    f.write(model.json(indent=4))
