import "./styles.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import layoutTemplate from "./hbs/layout.hbs";
import filterTemplate from "./hbs/filter.hbs"
import mapTemplate from "./hbs/map.hbs";



import weather from "./js/weather";
import Map from "./js/map";


const appEl = document.getElementById("app");
const siteInfo = { title: "Ottawa Playareas" };
window.document.title = siteInfo.title;
appEl.innerHTML = layoutTemplate(siteInfo);

let weatherContainer = document.getElementById("weather-pane");
let weatherOttawa = new weather(45.249814, -76.0804444, weatherContainer);


const mapEl = document.getElementById("map-pane");
const filterEl = document.getElementById("filter-pane");
filterEl.innerHTML = filterTemplate();
mapEl.innerHTML = mapTemplate();

const queryUrl = "http://localhost:3000/api/";

let filters = [];
let qString = "";


document.getElementById("filter").addEventListener("click", async () => {
    // console.log("filter buttom clicked")

    let ageGroup = document.getElementById("age-group");

    filters.push(ageGroup.value);

    let allCheckbox = document.getElementsByClassName("form-check-input");
    for (let i = 0; i < allCheckbox.length; i++) {
        if (allCheckbox[i].checked) filters.push(allCheckbox[i].value);
    }
    qString = queryString(filters);
    let list = await getAllLocations(qString);
    Map.remove();
    Map.marks(list);

    // console.log(filters)
    filters = [];
});


document.getElementById("clear").addEventListener("click", () => {
    // console.log("clear buttom clicked")
    let allCheckbox = document.getElementsByClassName("form-check-input");
    for (let i = 0; i < allCheckbox.length; i++) {
        allCheckbox[i].checked = false;
    }
});



let init = async function () {

    Map.remove();
    Map.mapInit();
    let list = await getAllLocations(qString);
    // console.log(list);
    Map.marks(list);
};


async function getAllLocations(qString) {
    let response;
    if (qString === "") {
        response = await (await fetch(queryUrl)).json();
    } else {
        let queryString = queryUrl + "options" + qString;
        response = await (await fetch(queryString)).json();
    }

    console.log(response[0]);

    let locationList = [];

    for (let i = 0; i < response.length; i++) {
        locationList.push({
            "name": response[i].properties.PARKNAME,
            "address": response[i].properties.PARKADDRESS,
            "coords": response[i].geometry.coordinates
        });
    }

    // console.log(locationList[1]);

    return locationList;
}

function queryString(filters) {
    let age_group = filters[0];
    let restQueryString = "";
    for (let i = 1; i < filters.length; i++) {
        restQueryString += `&${filters[i]}=yes/oui`
    }

    let query = `?AGE_GROUP=${age_group}` + restQueryString;
    // console.log(query);
    return query;
}



init();
