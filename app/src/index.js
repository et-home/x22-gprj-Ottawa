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

let filters = [];


let btnFilter = document.getElementById("filter").addEventListener("click", () => {
    // console.log("filter buttom clicked")

    let ageGroup = document.getElementById("age-group");

    filters.push(ageGroup.value);

    let allCheckbox = document.getElementsByClassName("form-check-input");
    for (let i = 0; i < allCheckbox.length; i++) {
        if (allCheckbox[i].checked) filters.push(allCheckbox[i].value);
    }

    console.log(filters)
    filters = [];
});


let btnClear = document.getElementById("clear").addEventListener("click", () => {
    // console.log("clear buttom clicked")
    let allCheckbox = document.getElementsByClassName("form-check-input");
    for (let i = 0; i < allCheckbox.length; i++) {
        allCheckbox[i].checked = false;
    }
});





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
