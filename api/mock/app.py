from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from constants import MenuItem, MenuType
import json
from faker import Faker
import logging

# Set up logging configuration
logging.basicConfig(
    level=logging.INFO,  # Set the root logger to debug level
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

# Retrieve the Uvicorn logger and set its level
uvicorn_logger = logging.getLogger("uvicorn")
uvicorn_logger.setLevel(logging.DEBUG)


app = FastAPI()
faker = Faker(locale="en_US")

origins = ["http://localhost:5173", "http://example.com"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.api_route("/", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def handle_request(request: Request):
    if request.headers.get("content-type") == "application/json":
        data = await request.json()
    else:
        form = await request.form()
        data = {key: value for key, value in form.items()}

    response = {
        "method": request.method,
        "data": data,
    }
    return JSONResponse(response)


@app.get("/status")
async def status():
    try:
        with open("data.json", "r") as json_file:
            data = json.load(json_file)
        return JSONResponse(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.api_route("/update", methods=["POST", "PATCH"])
async def update_data(request: Request):
    try:
        new_data = await request.json()
        if not new_data:
            raise HTTPException(status_code=400, detail="Invalid JSON data")

        with open("data.json", "r") as json_file:
            data = json.load(json_file)

        if request.method == "POST":
            data = new_data
        elif request.method == "PATCH":
            data.update(new_data)

        with open("data.json", "w") as json_file:
            json.dump(data, json_file, indent=4)

        return JSONResponse(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/nav-menu")
async def nav_menu():
    try:
        menu = [
            MenuItem(
                id=faker.uuid4(),
                parentId="0",
                name="Dashboard",
                label="sys.menu.dashboard",
                type=MenuType.MENU,
                route="/dashboard",
                order=1,
                icon="ic-analysis",
            )
        ]

        # Create a root permission
        menu = menu + [
            MenuItem(
                id=faker.uuid4(),
                parentId="0",
                name="ServiceNetwork",
                label="sys.menu.service_netowrk",
                type=MenuType.MENU,
                route="/servicemap",
                order=2,
                icon="ic-analysis",
                newFeature=True,
            )
        ]

        more = MenuItem(
            id=faker.uuid4(),
            parentId="0",
            name="More",
            label="sys.menu.more",
            type=MenuType.CATALOGUE,
            route="/m",
            order=3,
            icon="ic-analysis",
        )

        more.children = [
                MenuItem(
                    id=faker.uuid4(),
                    parentId=more.id,
                    name="About",
                    label="sys.menu.about",
                    type=MenuType.MENU,
                    route="/m/about",
                    order=1,
                    icon="ic-analysis",
                ),
                MenuItem(
                    id=faker.uuid4(),
                    parentId=more.id,
                    name="login",
                    label="sys.menu.login",
                    type=MenuType.MENU,
                    route="/m/login",
                    order=2,
                    icon="ic-analysis",
                ),
            ]

        menu.append(more)

        multilevel = MenuItem(
            id=faker.uuid4(),
            parentId="0",
            name="Menu Level",
            label="sys.menu.menulevel.index",
            type=MenuType.CATALOGUE,
            route="/menu-level",
            order=4,
            icon="ic-analysis",
        )
        multilevel.children = [
            MenuItem(
                id=faker.uuid4(),
                parentId=multilevel.id,
                name="Menu Level 1a",
                label="sys.menu.menulevel.1a",
                type=MenuType.MENU,
                route="/menu-level/menu-level-1a",
                order=1,
                icon="ic-analysis",
            ),
            MenuItem(
                id=faker.uuid4(),
                parentId=multilevel.id,
                name="Menu Level 1b",
                label="sys.menu.menulevel.1b.index",
                type=MenuType.CATALOGUE,
                route="/menu-level/menu-level-1b",
                order=2,
                icon="ic-analysis",
            ),
        ]
        multilevel.children[1].children = [
            MenuItem(
                id=faker.uuid4(),
                parentId=multilevel.children[1].id,
                name="Menu Level 2a",
                label="sys.menu.menulevel.1b.2a",
                type=MenuType.MENU,
                route="/menu-level/menu-level-1b/menu-level-2a",
                order=1,
                icon="ic-analysis",
            ),
            MenuItem(
                id=faker.uuid4(),
                parentId=multilevel.children[1].id,
                name="Menu Level 2b",
                label="sys.menu.menulevel.1b.2b.index",
                type=MenuType.MENU,
                route="/menu-level/menu-level-1b/menu-level-2b",
                order=2,
                icon="ic-analysis",
            ),

        ]

        menu.append(multilevel)
        menu_json = [item.model_dump() for item in menu]
        return JSONResponse(menu_json)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/servicemap")
def service_map():
    try:
        with open("service-map.json", "r") as json_file:
            data = json.load(json_file)
        return JSONResponse(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8080
    )
