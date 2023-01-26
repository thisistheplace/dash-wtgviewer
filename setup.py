import json
import os
from setuptools import setup, find_packages


with open("package.json") as f:
    package = json.load(f)

package_name = package["name"].replace(" ", "_").replace("-", "_")

setup(
    name=package_name,
    version=package["version"],
    author=package["author"],
    packages=[
        package_name,
        f"{package_name}/model",
        f"{package_name}/model/fea",
        f"{package_name}/model/geometry",
        f"{package_name}/model/results",
    ],
    include_package_data=True,
    license=package["license"],
    description=package.get("description", package_name),
    install_requires=[],
    classifiers=[
        "Framework :: Dash",
    ],
)
