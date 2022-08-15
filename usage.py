"""Example usage of DashWtgViewer component"""
import random
from dash import Dash, html

from dash_wtgviewer.DashWtgviewer import DashWtgviewer

from usage.model import read_model

app = Dash()

model_data, rotor_diameter, number_of_blades = read_model("usage/model.json")

mem_dict = [mem.__dict__() for mem in model_data.values()]
nacelle = [mem for mem in mem_dict if mem["cmpt_type"] == "NACELLE"]
member_data = [mem for mem in mem_dict if mem["cmpt_type"] == "TUBULAR"]

# Create dummy results data
min_result = 0.0
max_result = 1.0
results = {mem["number"]: random.uniform(min_result, max_result) for mem in member_data}

app.layout = html.Div(
    DashWtgviewer(
        id="example",
        members=member_data,
        nacelle=nacelle,
        rotor_diameter=rotor_diameter,
        num_blades=number_of_blades,
        max=min_result,
        min=max_result,
        values=results
    )
)

if __name__ == "__main__":
    app.run_server(debug=True)