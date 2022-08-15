""" Generate a json structure defining a Bladed model """
from pathlib import Path
import json
import math

# classes
class Tubular:
    def __init__(self, number=None, nodes={}, diameters=[]):
        self.number = int(number)
        self.nodes = {int(k): [v["X"], v["Y"], v["Z"]] for k, v in nodes.items()} # dict, key: nid, value: coords
        if len(diameters) == 1:
            diameters = [diameters[0], diameters[0]]
        self.diameters = diameters
        self.cmpt_type = "TUBULAR"

    @property
    def cmpt_id(self):
        nodes = list(self.nodes.keys())
        return "Member: {}, Nodes: [{}, {}]".format(self.number, nodes[0], nodes[1])
    
    def __dict__(self):
        """ Structure is:
            { "number": 1.0,}
            [number, node1, node2, radius1, radius2]
        """
        output = {}
        output["number"] = self.number
        coords = list(self.nodes.values())
        output["node1"] = coords[0]
        output["node2"] = coords[1]
        output["radius1"] = self.diameters[1] / 2.0
        output["radius2"] = self.diameters[0] / 2.0
        output["cmpt_type"] = self.cmpt_type
        output["cmpt_str"] = self.cmpt_id
        if hasattr(self, "value"):
            output["value"] = self.value
        return output

    def __str__(self):
        return "{}: {}".format(self.number, list(self.nodes.keys()))


class Nacelle:
    def __init__(self, height=0.0, width=0.0, length=0.0, node={"X": 0.0, "Y": 0.0, "Z": 0.0}, direction=[0.0, 0.0, 0.0]):
        self.height = height
        self.width = width
        self.length = length
        self.node = [node["X"], node["Y"], node["Z"]]
        self.direction = direction
        self.cmpt_type = "NACELLE"
        self.cmpt_id = "nacelle"
        self.number = "nacelle"
    
    def __dict__(self):
        """ Structure is:
            { "number": 1.0,}
            [number, node1, node2, radius1, radius2]
        """
        output = {}
        output["height"] = self.height
        output["width"] = self.width
        output["length"] = self.length
        output["node"] = self.node
        output["direction"] = self.direction
        output["cmpt_type"] = self.cmpt_type
        output["cmpt_id"] = self.cmpt_id
        if hasattr(self, "value"):
            output["value"] = self.value
        return output

    def __str__(self):
        return "{}: {}".format(self.number, list(self.nodes.keys()))

# define component types
CMPT_TYPE = {"TUBULAR": Tubular, "NACELLE": Nacelle}

def read_model(json_path):
    data = json.load(open(Path(json_path).resolve(), "r"))

    print("number of nodes:", len(data["nodes"].keys()))
    print("number of elements:", len(data["elements"].keys()))

    # generate member objects
    members = {} # key: number, value: object
    for element, eldata in data["elements"].items():
        if eldata["type"] != "TUBULAR":
            continue
        coords = {}
        try:
            for nid in eldata["nodes"]:
                coords[nid] = data["nodes"][str(nid)]
            members[element] = CMPT_TYPE["TUBULAR"](element, coords, eldata["diameter"])
        except KeyError:
            continue
    
    # find nacelle node from highest member node
    max_coord = [0.0, 0.0, 0.0]
    for mem in members.values():
        for node, coords in mem.nodes.items():
            if coords[2] > max_coord[2]:
                max_coord = coords

    # assume nacelle is cuboid
    nacelle = [el for el in data["elements"].values() if el["type"] == "CUBOID"][0]
    members["nacelle"] = CMPT_TYPE["NACELLE"](
        nacelle["height"],
        nacelle["width"],
        distance_between_points(
            data["nodes"][str(nacelle["nodes"][1])],
            data["nodes"][str(nacelle["nodes"][0])]
        ),
        {"X":max_coord[0], "Y":max_coord[1], "Z":max_coord[2]}
    )

    return members, data["rotor_diameter"], data["number_of_blades"]

def distance_between_points(node1, node2):
    return math.sqrt(
        (node2["X"] - node1["X"]) ** 2 +
        (node2["Y"] - node1["Y"]) ** 2 +
        (node2["Z"] - node1["Z"]) ** 2
    )