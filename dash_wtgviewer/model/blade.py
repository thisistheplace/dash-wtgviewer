from pydantic import validator, ValidationError
from pathlib import Path

from .base import Base

SUPPORTED_MODELS = ["gltf", "glb"]


class Blade(Base):
    url: str  # url to the gltf or glb file to load

    @validator("url", pre=True, always=True)
    def set_url_now(cls, url):
        url_path = Path(url)
        if url.suffix.lower() not in SUPPORTED_MODELS:
            raise ValidationError(
                f"Cannot support blade model of file type {url_path.suffix}, please provide one of {SUPPORTED_MODELS}"
            )
