import math
import json

from dash_wtgviewer.model import Model, Foundation
from dash_wtgviewer.model.fea.elements import Tube, ElementSet, ElementType
from dash_wtgviewer.model.fea.nodes import Node, NodeSet

BOTTOM = -40
TOP = 5

HEIGHT = TOP - BOTTOM

BOTTOM_WIDTH = 20
TOP_WIDTH = 10

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
        diameter=0.4,
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
        diameter=0.4,
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
        diameter=0.8,
        thickness=0.03,
    )
    for idx in range(1, LEGS * BAYS + 1)
}

# Combine elements
elements = {}
elements.update(forward_braces)
elements.update(backward_braces)
elements.update(chords)

# for k, v in elements.items():
#     print(k)
#     print(v)

# Load existing model
model = Model(**json.load(open("assets/model.json", "rb")))
model.foundation.element_set.elements = list(elements.values())

with open("assets/ea1_model.json", "w") as f:
    f.write(model.json(indent=4))
