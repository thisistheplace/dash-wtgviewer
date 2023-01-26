import json
from random import random

from dash_wtgviewer.model.model import Model, find_type
from dash_wtgviewer.model.fea.elements import Element

from dash_wtgviewer.model.results.base import BaseResult
from dash_wtgviewer.model.results.element import ElementResult
from dash_wtgviewer.model.results.results import Results

data = json.load(open("assets/ea1_model.json", "r"))
model = Model(**data)
elements = find_type(model, Element)
print(f"found {len(elements)} elements")

element_results = []
for element in elements:
    element_results.append(
            ElementResult(
            target=element.id,
            results=[
                BaseResult(
                    value=random()
                )
                for _ in element.nodes
            ]
        )
    )

result = Results(
    element_results=element_results
)

with open("assets/ea1_results.json", "w") as f:
    f.write(result.json(indent=4))