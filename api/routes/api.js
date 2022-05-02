const express = require("express");
const router = express.Router();
const DataCache = require("../model/cache");
const PlayAreas = require("../model/playarea");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let checkResult = await DataCache.checkDataAge();
  let playareaList = await PlayAreas.getList();

  console.log(checkResult.status);
  console.log(playareaList);
  res.send();
});




router.post("/", async function (req, res, next) {
  res.send();
});

module.exports = router;
