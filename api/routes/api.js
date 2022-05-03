const express = require("express");
const router = express.Router();
const DataCache = require("../model/cache");
const PlayAreas = require("../model/playarea");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let checkResult = await DataCache.checkDataAge();

  if (checkResult.status === "ready") {
    let playareaList = await PlayAreas.getList();
  };

  res.send(playareaList);
});


// router.get("/options?:age_group&:climbing&:tire_swing&:swings_preschool_seats&:swings_belt_seats&:slides&:see_saw&:sand_box&:hopscotch&:playhouse&:spring_toy&:fencing&:accessible", async function (req, res, next) {
router.get("/options", async function (req, res, next) {

  let filters = req.query;
  let playareaList = await PlayAreas.getList();

  // filter according to filters 
  playareaList = playareaList.filter((item) => {
    for (const props in filters) {
      if (item.properties[props] == null || item.properties[props] == " " || item.properties[props] != filters[props]) return false;
    }
    return true;
  });

  console.log(Object.keys(playareaList).length);
  res.send(playareaList);
});


module.exports = router;
