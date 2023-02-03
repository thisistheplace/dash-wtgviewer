import os

from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium import webdriver

from dash.testing.browser import logger
from dash.testing.plugin import DashComposite

class DashFixChromeLoad(DashComposite):
    def __init__(self, server, **kwargs):
        super().__init__(server, **kwargs)

    def _get_chrome(self):
        
            options = self._get_wd_options()

            options.set_capability("loggingPrefs", {"browser": "SEVERE"})
            options.set_capability("goog:loggingPrefs", {"browser": "SEVERE"})

            service = Service(executable_path=ChromeDriverManager().install())

            if "DASH_TEST_CHROMEPATH" in os.environ:
                options.binary_location = os.environ["DASH_TEST_CHROMEPATH"]
                service = Service(executable_path=ChromeDriverManager().install())
            else:
                options.binary_location = service.path

            options.add_experimental_option(
                "prefs",
                {
                    "download.default_directory": self.download_path,
                    "download.prompt_for_download": False,
                    "download.directory_upgrade": True,
                    "safebrowsing.enabled": False,
                    "safebrowsing.disable_download_protection": True,
                },
            )
            options.add_argument("--disable-dev-shm-usage")
            options.add_argument("--no-sandbox")
            options.add_argument("--disable-gpu")
            options.add_argument("--remote-debugging-port=9222")

            chrome = (
                webdriver.Remote(command_executor=self._remote_url, options=options)
                if self._remote
                # else webdriver.Chrome(service=service, options=options)
                else webdriver.Chrome(service=service)
            )

            # https://bugs.chromium.org/p/chromium/issues/detail?id=696481
            if self._headless:
                # pylint: disable=protected-access
                chrome.command_executor._commands["send_command"] = (
                    "POST",
                    "/session/$sessionId/chromium/send_command",
                )
                params = {
                    "cmd": "Page.setDownloadBehavior",
                    "params": {"behavior": "allow", "downloadPath": self.download_path},
                }
                res = chrome.execute("send_command", params)
                logger.debug("enabled headless download returns %s", res)

            chrome.set_window_position(0, 0)
            return chrome