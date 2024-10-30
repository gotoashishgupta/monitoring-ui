import random
from enum import Enum
from typing import List, Optional

from faker import Faker
from pydantic import BaseModel


class MenuStatus(Enum):
    DISABLE = 0
    ENABLE = 1


class MenuType(Enum):
    CATALOGUE = "CATALOGUE"
    MENU = "MENU"
    BUTTON = "BUTTON"


class MenuItem(BaseModel):
    id: str
    parentId: str
    name: str
    label: str
    type: MenuType
    route: str
    status: Optional[MenuStatus] = None
    order: Optional[int] = None
    icon: Optional[str] = None
    component: Optional[str] = None
    hide: Optional[bool] = None
    hideTab: Optional[bool] = None
    frameSrc: Optional[str] = None
    newFeature: Optional[bool] = None
    children: Optional[List['MenuItem']] = None

    class Config:
        use_enum_values = True


def menu_item(parent_id: str = "0") -> MenuItem:
    faker = Faker()
    return MenuItem(
        id=faker.uuid4(),
        parentId=parent_id,
        name=faker.word(),
        label=faker.word(),
        type=random.choice(list(MenuType)),
        route=faker.uri_path(),
        status=random.choice(list(MenuStatus)),
        order=faker.random_int(min=1, max=10),
        icon=faker.word(),
        component=faker.word(),
        hide=faker.boolean(),
        hideTab=faker.boolean(),
        frameSrc=faker.uri(),
        newFeature=faker.boolean(),
        children=[],
    )
