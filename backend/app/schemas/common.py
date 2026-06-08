from typing import Annotated

from pydantic import Field

EmailString = Annotated[
    str,
    Field(min_length=3, max_length=254, pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$"),
]
PhoneString = Annotated[str, Field(min_length=6, max_length=40)]
ShortString = Annotated[str, Field(min_length=1, max_length=160)]
LongTextString = Annotated[str, Field(min_length=1, max_length=2000)]
