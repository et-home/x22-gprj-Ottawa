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


let init = function () {
    Map.mapInit();
};




init();
