"""Example usage of DashWtgViewer component"""
import json
from dash import Dash, html, Input, Output, State, no_update
import dash_bootstrap_components as dbc

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
    [
        DashWtgviewer(
            id="viewer",
            model=json.load(open("assets/model.json", "r")),
            show_map=True,
            environment=True,
            tooltip=True,
            map={
                "center":{"id":"center", "lat":52.29733, "lng":2.35038},
                "turbines":{"positions":json.load(open("assets/ea1_turbines.json", "r"))},
                "boundary":{"positions":json.load(open("assets/ea1_boundary.json", "r"))}
            }
        ),
        html.Div(
            [
                dbc.Switch(
                    id="toggle_map",
                    label="map",
                    value=True,
                ),
                dbc.Switch(
                    id="toggle_environment",
                    label="environment",
                    value=True,
                ),
                dbc.Switch(
                    id="toggle_tooltip",
                    label="tooltip",
                    value=True,
                ),
            ],
            style={
                "zIndex": "100",
                "right": "0px",
                "top": "0px",
                "margin": "20px",
                "position": "absolute",
                "display": "block",
            },
        )
    ],
    style={
        "width":"100vw",
        "height":"100vh"
    }
)


@app.callback(Output('output', 'children'), [Input('input', 'value')])
def display_output(value):
    return 'You have entered {}'.format(value)

@app.callback(
    Output("viewer", "tooltip"),
    Input("toggle_tooltip", "value"),
    prevent_initial_call=True,
)
def toggle_map(toggle):
    return toggle


@app.callback(
    Output("viewer", "environment"),
    Input("toggle_environment", "value"),
    prevent_initial_call=True,
)
def toggle_map(toggle):
    return toggle

@app.callback(
    Output("viewer", "show_map"),
    # Output("toggle_environment", "style"),
    Input("toggle_map", "value"),
    State("viewer", "show_map"),
    prevent_initial_call=True,
)
def toggle_map(toggle, show_map):
    if show_map != toggle:
        return toggle
    else:
        return no_update

@app.callback(
    Output("toggle_map", "value"),
    Input("viewer", "show_map"),
    State("toggle_map", "value"),
    prevent_initial_call=True,
)
def monitor_map(show_map, toggle):
    if show_map != toggle:
        return show_map
    else:
        return no_update

if __name__ == "__main__":
    app.run_server(debug=False, port=8080)
