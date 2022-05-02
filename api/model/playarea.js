const dbcPool = require("./db");

let PlayAreas = {};

PlayAreas.getList = async () => {
    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT playareas FROM playarea ORDER BY lastUpdated desc LIMIT 1");
    dbConn.end();

    return JSON.parse(rows[0].playareas);


}


module.exports = PlayAreas;
