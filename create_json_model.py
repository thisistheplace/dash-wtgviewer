import json
from pathlib import Path

from dash_wtgviewer.model import *
from dash_wtgviewer.model.fea.elements import Tube, Cone, Cuboid, ElementSet, ConicalTube
from dash_wtgviewer.model.fea.nodes import Node, NodeSet

BLADE_URL = "assets/blade.glb"

def read_model(json_path: str | Path):
    data = json.load(open(Path(json_path).resolve(), "r"))

    nodes = {}
    node_sets = {}
    elements = {}
    element_sets = {}

    # get nodes
    for node in data["nodes"].values():
        node = Node(
            x=node["X"],
            y=node["Y"],
            z=node["Z"]
        )
        nodes[node.id] = node
    max_node_id = max(list(nodes.keys()))
    nodes[max_node_id + 1] = Node(
        x=nodes[max_node_id].x - 1,
        y=nodes[max_node_id].y,
        z=nodes[max_node_id].z
    )

    node_sets["foundation"] = NodeSet(
        name="foundation",
        nodes=list(range(1, 8))
    )

    node_sets["tower"] = NodeSet(
        name="tower",
        nodes=list(range(8, 11))
    )

    node_sets["nacelle"] = NodeSet(
        name="foundation",
        nodes=list(range(11, 13))
    )

    # get elements
    for element in data["elements"].values():
        if element["type"] == "TUBULAR":
            if len(element["diameter"]) == 2:
                element = ConicalTube(
                    nodes=element["nodes"],
                    diameters=element["diameter"],
                    thicknesses=[0.01, 0.01]
                )
            else:
                element = Tube(
                    nodes=element["nodes"],
                    diameter=element["diameter"][0],
                    thickness=0.01
                )
        elif element["type"] == "CUBOID":
            element = Cuboid(
                nodes=element["nodes"],
                height=element["height"],
                width=element["width"]
            )
        elements[element.id] = element
    
    element_sets["foundation"] = ElementSet(
        name="foundation",
        elements=list(range(1, 7)),
    )

    element_sets["tower"] = ElementSet(
        name="tower",
        elements=list(range(7, 10))
    )

    element_sets["nacelle"] = ElementSet(
        name="foundation",
        elements=list(range(10, 11))
    )

    # Components
    blades = [
        Blade(
            name=f"Blade_{idx}",
            url=BLADE_URL,
            node=node_sets["tower"].nodes[-1]
        ) for idx in range(1, 4)
    ]
    foundation = Foundation(
        name="trileg",
        node_sets=[node_sets["foundation"]],
        element_sets=[element_sets["foundation"]]
    )
    hub = Hub(
        name="hub",
        cone=Cone(
            nodes=list(nodes.keys())[-2:],
            diameter=0.5
        )
    )
    nacelle = Nacelle(
        name="nacelle",
        element_sets=[element_sets["nacelle"]]
    )
    tower = Tower(
        name="tower",
        node_sets=[node_sets["tower"]],
        element_sets=[element_sets["tower"]]
    )

    # Compile model
    return Model(
        name="test-model",
        blades=blades,
        foundation=foundation,
        hub=hub,
        nacelle=nacelle,
        tower=tower
    )

if __name__ == "__main__":
    the_model = read_model("assets/old_model.json")

    with open("assets/model.json", "w") as f:
        f.write(the_model.json(indent=4))

    with open("assets/schema.json", "w") as f:
        f.write(Model.schema_json(indent=4))