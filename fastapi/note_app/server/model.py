from typing import Optional
from pydantic import BaseModel, Field


class NoteSchema(BaseModel):
    title: Optional[str] = Field(None, example="NoteNexus")
    content: Optional[str] = Field(
        None, example="For technical writers, NoteNexus offers a seamless and beneficial publishing experience.")

    class Config:
        from_attributes = True
