import "./styles.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import layoutTemplate from "./hbs/layout.hbs";
import filterTemplate from "./hbs/filter.hbs"
import mapTemplate from "./hbs/map.hbs";


import Map from "./js/map";

const appEl = document.getElementById("app");
const siteInfo = { title: "Ottawa Playareas" };
window.document.title = siteInfo.title;
appEl.innerHTML = layoutTemplate(siteInfo);

const mapEl = document.getElementById("map-pane");
const filterEl = document.getElementById("filter-pane");
filterEl.innerHTML = filterTemplate();
mapEl.innerHTML = mapTemplate();

const queryUrl = "http://localhost:3000/api/";


let init = async function () {
    // Map.mapInit();
    let list = await getAllLocations();
    // console.log(list);
    // Map.marks(list);
};


async function getAllLocations() {
    let response = await (await fetch(queryUrl)).json();
    let locationList = [];

    for (let i = 0; i < response.length; i++) {
        locationList.push(response[i].geometry.coordinates);
    }

    return locationList;
}



init();
