

import apiKey from "../../apikey";

mapboxgl.accessToken = apiKey.access.apiKey;
let Map = {};
let displayMap;
let marks = [];
let defaultView = [-75.695000, 45.424721];


Map.mapInit = async function () {
    displayMap = new mapboxgl.Map({
        container: "map-pane", // container ID
        style: "mapbox://styles/e-tao/cl2fg7qd0000e14mmjkrnmf14", // style URL
        center: defaultView, // starting position [lng, lat]
        zoom: 13, // starting zoom
    });
};


Map.marks = async function (list) {
    let mark;
    list.forEach((item) => {
        mark = new mapboxgl.Marker({
            color: "red",
        })
            .setLngLat(item.coords)
            .setPopup(new mapboxgl.Popup({
                closeButton: false,
            }).setHTML(`<p>${item.name}</p><p>${item.address}</p>`))
            .addTo(displayMap);
        marks.push(mark)
    });
}

Map.remove = async () => {
    marks.forEach((mark) => {
        mark.remove();
    })

    marks = [];
}

export default Map;