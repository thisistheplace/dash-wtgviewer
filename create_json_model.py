import json
from pathlib import Path

from dash_wtgviewer.model import *
from dash_wtgviewer.model.fea.elements import Tube, Cone, Cuboid, ElementSet, ConicalTube
from dash_wtgviewer.model.fea.nodes import Node, NodeSet
from dash_wtgviewer.model.geometry.vectors import Vector3

BLADE_URL = "assets/models/blade.glb"

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
    # extra hub node
    nodes[max_node_id + 1] = Node(
        x=nodes[max_node_id].x - 1.5,
        y=nodes[max_node_id].y,
        z=nodes[max_node_id].z
    )

    node_sets["foundation"] = NodeSet(
        name="foundation",
        nodes=[nodes[nid] for nid in range(1, 8)]
    )

    node_sets["tower"] = NodeSet(
        name="tower",
        nodes=[nodes[nid] for nid in range(8,11)]
    )

    # get elements
    for element in data["elements"].values():
        if element["type"] == "TUBULAR":
            if len(element["diameter"]) == 2:
                element = ConicalTube(
                    nodes=[nodes[nid] for nid in element["nodes"]],
                    diameters=element["diameter"],
                    thicknesses=[0.01, 0.01]
                )
            else:
                element = Tube(
                    nodes=[nodes[nid] for nid in element["nodes"]],
                    diameter=element["diameter"][0],
                    thickness=0.01
                )
        elif element["type"] == "CUBOID":
            element = Cuboid(
                nodes=[nodes[nid] for nid in element["nodes"]],
                height=element["height"],
                width=element["width"]
            )
        elements[element.id] = element
    
    element_sets["foundation"] = ElementSet(
        name="foundation",
        elements=[elements[elid] for elid in range(1, 7)]
    )

    element_sets["tower"] = ElementSet(
        name="tower",
        elements=[elements[elid] for elid in range(7, 10)]
    )

    # Components
    blades = [
        Blade(
            name=f"Blade_{idx}",
            url=BLADE_URL,
            node=node_sets["tower"].nodes[-1],
            scale=Vector3(x=1, y=0.5, z=0.5)
        ) for idx in range(1, 4)
    ]
    foundation = Foundation(
        node_sets=[node_sets["foundation"]],
        element_set=element_sets["foundation"]
    )
    hub = Hub(
        cone=Cone(
            nodes=list(nodes.values())[-2:],
            diameter=1.5
        )
    )
    rotor = Rotor(
        blades=blades,
        hub=hub,
        node=list(nodes.values())[-2]
    )
    nacelle = Nacelle(
        element=elements[10]
    )
    tower = Tower(
        node_sets=[node_sets["tower"]],
        element_set=element_sets["tower"]
    )

    # Compile model
    return Model(
        name="model",
        foundation=foundation,
        nacelle=nacelle,
        rotor=rotor,
        tower=tower
    )

if __name__ == "__main__":
    the_model = read_model("assets/old_model.json")

    with open("assets/model.json", "w") as f:
        f.write(the_model.json(indent=4))

    with open("assets/schema.json", "w") as f:
        f.write(Model.schema_json(indent=4))