

import apiKey from "../../apikey";

mapboxgl.accessToken = apiKey.access.apiKey;
let Map = {};

Map.mapInit = async function () {
    new mapboxgl.Map({
        container: "map-pane", // container ID
        style: "mapbox://styles/e-tao/cl2fg7qd0000e14mmjkrnmf14", // style URL
        center: [-75.695000, 45.424721], // starting position [lng, lat]
        zoom: 13, // starting zoom
    });
};

export default Map;