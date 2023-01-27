import json
import math

from dash_wtgviewer.model.model import Model, find_type
from dash_wtgviewer.model.fea.elements import Element

from dash_wtgviewer.model.results.base import BaseResult
from dash_wtgviewer.model.results.element import ElementResult
from dash_wtgviewer.model.results.results import Results

MAX_VAL = 100
MIN_VAL = 20

data = json.load(open("assets/ea1_model.json", "r"))
model = Model(**data)
elements = find_type(model, Element)
print(f"found {len(elements)} elements")

# find height difference
max_height = -math.inf
min_height = math.inf
for element in elements:
    max_height = max(max_height, element.nodes[0].z)
    min_height = min(min_height, element.nodes[0].z)
height = max_height - min_height

element_results = []
for element in elements:
    element_results.append(
            ElementResult(
            target=element.id,
            results=[
                BaseResult(
                    value= MIN_VAL + (MAX_VAL - MIN_VAL) * (max_height - node.z) / height
                )
                for node in element.nodes
            ]
        )
    )

result = Results(
    element_results=element_results
)

with open("assets/ea1_results.json", "w") as f:
    f.write(result.json(indent=4))