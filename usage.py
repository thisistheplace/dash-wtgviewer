"""Example usage of DashWtgViewer component"""
import json
from dash import Dash, html

from dash_wtgviewer.DashWtgviewer import DashWtgviewer

# external CSS stylesheets
external_stylesheets = [
    {
        'href': 'https://unpkg.com/leaflet@1.9.2/dist/leaflet.css',
        'rel': 'stylesheet',
        'integrity': 'sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14=',
        'crossorigin': ''
    },
    {
        'href': 'https://unpkg.com/leaflet@1.9.2/dist/leaflet.js',
        'rel': 'stylesheet',
        'integrity': 'sha256-o9N1jGDZrf5tS+Ft4gbIK7mYMipq9lqpVJ91xHSyKhg=',
        'crossorigin': ''
    }
]

app = Dash(
    external_stylesheets=external_stylesheets
)

app.layout = html.Div(
    DashWtgviewer(
        id="example",
        model=json.load(open("assets/model.json", "r")),
        show_map=True,
        map={
            "center":{"id":"center", "lat":52.29733, "lng":2.35038},
            "turbines":{"positions":json.load(open("assets/ea1_turbines.json", "r"))},
            "boundary":{"positions":json.load(open("assets/ea1_boundary.json", "r"))}
        }
    ),
    style={
        "width":"100vw",
        "height":"100vh"
    }
)

if __name__ == "__main__":
    app.run_server(debug=True)
