# dash_wtgviewer

`dash_wtgviewer` is a React component library developed for compatibility with Plotly Dash.

This library aims to provide efficient 3D visualisation of geo located offshore wind turbine
structures within a wind farm and includes the following features:
- Map overlay of wind farm and wind turbine locations using https://react-leaflet.js.org/
- 3D visualisation of wind farm and wind turbines using [threejs](https://threejs.org), [react-three-fibre](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) and [drei](https://github.com/pmndrs/drei) 
- Environmental rendering using https://threejs.org/examples/webgl_shaders_ocean.html
- Generic wind turbine model definition using [pydantic](https://docs.pydantic.dev), which is compatible
with [FastAPI](https://fastapi.tiangolo.com) and conforms to [OpenAPI](https://www.openapis.org/)

A live demo of it's functionality is available at https://spillthebeans.beancandesign.com/wind

![demo](dash_wtgviewer.gif)

## Usage
Install `dash-wtgviewer` into your python environment using:
```bash
python -m pip install dash_wtgviewer
```

Create a compatible model using the included [pydantic](https://docs.pydantic.dev) classes:
```python
# some example imports
from dash_wtgviewer.model import Model, Foundation, Blade, Nacelle, Rotor, Hub, Tower
from dash_wtgviewer.model.fea.elements import Tube, Cuboid, Cone, ElementSet, ConicalTube
from dash_wtgviewer.model.fea.nodes import Node
from dash_wtgviewer.model.geometry.vectors import Vector3

# create model components
blades = [
    Blade(
        name=f"Blade_{idx}",
        # Url to blade .gltf or .glb file which Dash is serving in the assets directory
        # This blade model should have it's length orientated with the X axis
        url='assets/path/to/my/blade/model.glb',
        scale=Vector3(x=1, y=0.5, z=0.5),
    )
    for idx in range(1, 4)
]

hub = Hub(
    cone=Cone(
        nodes=[
            Node(x=0, y=0, z=0),
            Node(x=2, y=0, z=0),
        ],
        diameter=1,
    )
)

rotor = Rotor(
    blades=blades,
    hub=hub,
    node=Node(x=1, y=0, z=10)
)
...

# create model
model = Model(
    name="model", foundation=foundation, nacelle=nacelle, rotor=rotor, tower=tower
)

# write model to json to be loaded by the Dash server and served as a dict
# to the DashWtgviewer component
with open("assets/path/to/my/model.json", "w") as f:
    f.write(model.json(indent=4))
```

Include the `dash-wtgviewer` component in your dash app:
```python
from dash_wtgviewer import DashWtgviewer
app.layout = html.Div(
    DashWtgviewer(
        id="my-unique-id",
        model=json.load(open("assets/path/to/my/model.json", "r")),
        show_map=True,
        environment=True,
        tooltip=True,
        stats=True,
        map={
            "center": {"id": "center", "lat": 52.29733, "lng": 2.35038},
            "turbines": {
                "positions": json.load(open("assets/path/to/my/turbine_lat_lng_positions.json", "r"))
            },
            "boundary": {
                "positions": json.load(open("assets/path/to/my/wind_farm_boundary_lat_lng_positions.json", "r"))
            }
        },
        results=json.load(open("assets/path/to/my/results.json", "r")),
        colorscale={
            "visible": True,
            "min": 0, # optional, else takes results minimum value
            "max": 100 # optional, else takes results maximum value
        }
    )
)
```

### react-leaflet requirements
This package uses [react-leaflet](https://react-leaflet.js.org/) which requires the following
css sheets to be included in your Dash app:

```python
from dash import Dash
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
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

### Install dependencies

If you have selected install_dependencies during the prompt, you can skip this part.

1. Install npm packages
    ```
    $ npm install
    ```
2. Create a virtual env and activate.
    ```
    $ virtualenv venv
    $ . venv/bin/activate
    ```
    _Note: venv\Scripts\activate for windows_

3. Install python packages required to build components.
    ```
    $ pip install -r requirements.txt
    ```
4. Install the python packages for testing (optional)
    ```
    $ pip install -r tests/requirements.txt
    ```

### Develop code in `src/lib/components/DashWtgviewer.react.js`.

- Test your code using node:
    1. Build your code
        ```
        $ npm run build
        ```
    2. Start the node server:
        ```
        $ npm start
        ```        
    3. Visit http://localhost:8080 in your web browser

- Test your code in a Python environment:
    1. Build your code
        ```
        $ npm run build
        ```
    2. Run and modify the `usage.py` sample dash app:
        ```
        $ python usage.py
        ```
    3. Visit http://localhost:8080 in your web browser

- Write tests for your component.
    - A sample test is available in `tests/test_usage.py`, it will load `usage.py` and you can then automate interactions with selenium.
    - Run the tests with `$ pytest tests`.
    - The Dash team uses these types of integration tests extensively. Browse the Dash component code on GitHub for more examples of testing (e.g. https://github.com/plotly/dash-core-components)

- Add custom styles to your component by putting your custom CSS files into your distribution folder (`dash_wtgviewer`).
    - Make sure that they are referenced in `MANIFEST.in` so that they get properly included when you're ready to publish your component.
    - Make sure the stylesheets are added to the `_css_dist` dict in `dash_wtgviewer/__init__.py` so dash will serve them automatically when the component suite is requested.

- [Review your code](./review_checklist.md)

### Create a production build and publish:

1. Build your code:
    ```
    $ npm run build
    ```
2. Create a Python distribution
    ```
    $ python setup.py sdist bdist_wheel
    ```
    This will create source and wheel distribution in the generated the `dist/` folder.
    See [PyPA](https://packaging.python.org/guides/distributing-packages-using-setuptools/#packaging-your-project)
    for more information.

3. Test your tarball by copying it into a new environment and installing it locally:
    ```
    $ pip install dash_wtgviewer-0.0.1.tar.gz
    ```

4. If it works, then you can publish the component to NPM and PyPI:
    1. Publish on PyPI
        ```
        $ twine upload dist/*
        ```
    2. Cleanup the dist folder (optional)
        ```
        $ rm -rf dist
        ```
    3. Publish on NPM (Optional if chosen False in `publish_on_npm`)
        ```
        $ npm publish
        ```
        _Publishing your component to NPM will make the JavaScript bundles available on the unpkg CDN. By default, Dash serves the component library's CSS and JS locally, but if you choose to publish the package to NPM you can set `serve_locally` to `False` and you may see faster load times._

5. Share your component with the community! https://community.plotly.com/c/dash
    1. Publish this repository to GitHub
    2. Tag your GitHub repository with the plotly-dash tag so that it appears here: https://github.com/topics/plotly-dash
    3. Create a post in the Dash community forum: https://community.plotly.com/c/dash
