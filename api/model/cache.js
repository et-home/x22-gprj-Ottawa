const dbcPool = require("./db");
const axios = require("axios");

let DataCache = {};

DataCache.checkDataAge = async () => {
    let curDate = new Date();
    let lastUpdateDate = await lastUpdate();
    let timeDiff = Math.floor((curDate - lastUpdateDate) / (1000 * 3600 * 24));

    const updateInterval = 30; // define the update interval (in number of days) of database cashing;

    if (timeDiff > updateInterval || lastUpdateDate == null) {
        let updateResult = await updateDb(); //call update function to update the database
        if (updateResult.status === "success") return { "status": "ready" };
    }
    else {
        return { "status": "ready" }; //data is still usable, no update needed
    }

    // return { "status": "ready" }
}

async function lastUpdate() {

    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT playareas FROM playarea ORDER BY lastUpdated desc LIMIT 1"); //sort by last updated date in desc order and get the first result.
    dbConn.end();
    lastUpdated = rows.length == 0 ? null : rows[0].lastUpdated;
    return lastUpdated;
}


async function updateDb() {
    const query1 = "https://maps.ottawa.ca/arcgis/rest/services/Parks_Inventory/MapServer/15/query?where=1%3D1&outFields=*&resultOffset=0&resultRecordCount=1000&f=geojson";
    const query2 = "https://maps.ottawa.ca/arcgis/rest/services/Parks_Inventory/MapServer/15/query?where=1%3D1&outFields=*&resultOffset=1000&resultRecordCount=2000&f=geojson";

    queryResult1 = (await axios.get(query1)).data.features;
    queryResult2 = (await axios.get(query2)).data.features;

    results = [...queryResult1, ...queryResult2];

    try {
        let dbConn = await dbcPool.getConnection();
        await dbConn.query("INSERT INTO `ottawa`.`playarea` (`playareas`) VALUES (?);", [JSON.stringify(results)]);
        dbConn.end();
        return { "status": "success" };
    }
    catch (err) {
        console.log(err);
        dbConn.end();
        return { "status": "failed" };

    }
}

module.exports = DataCache;
