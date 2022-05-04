

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
    list.forEach((coords) => {
        mark = new mapboxgl.Marker({
            color: "red",
        })
            .setLngLat(coords)
            .setPopup(new mapboxgl.Popup().setHTML("<h4>your friend is here</h4>"))
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