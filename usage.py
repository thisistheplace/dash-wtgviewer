"""Example usage of DashWtgViewer component"""
import json
from dash import Dash, html

from dash_wtgviewer.DashWtgviewer import DashWtgviewer

app = Dash()

app.layout = html.Div(
    DashWtgviewer(
        id="example",
        model=json.load(open("assets/model.json", "r"))
    ),
    style={
        "width":"100vw",
        "height":"100vh"
    }
)

if __name__ == "__main__":
    app.run_server(debug=True)
