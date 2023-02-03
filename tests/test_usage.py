import pytest

from dash.testing.application_runners import import_app

from .browser import DashFixChromeLoad

# patch dash_duo fixture to use correct chrome driver
@pytest.fixture
def dash_test(request, dash_thread_server, tmpdir) -> DashFixChromeLoad:
    with DashFixChromeLoad(
        dash_thread_server,
        browser=request.config.getoption("webdriver"),
        remote=request.config.getoption("remote"),
        remote_url=request.config.getoption("remote_url"),
        headless=request.config.getoption("headless"),
        options=request.config.hook.pytest_setup_options(),
        download_path=tmpdir.mkdir("download").strpath,
        percy_assets_root=request.config.getoption("percy_assets"),
        percy_finalize=request.config.getoption("nopercyfinalize"),
        pause=request.config.getoption("pause"),
    ) as dc:
        yield dc

class TestComponentRenders:
    # Basic test for the component rendering.
    def test_toggle_map(self, dash_test):
        # Start a dash app contained as the variable `app` in `usage.py`
        app = import_app("usage")
        dash_test.start_server(app)

        # Get the generated component viewer with selenium
        # The html viewer will be a children of the #viewer dash component
        viewer_component = dash_test.wait_for_element("#viewer")

        # get map toggle
        toggle_map = dash_test.wait_for_element("#toggle_map")
        assert toggle_map.get_attribute("value") == "off"
        

        
