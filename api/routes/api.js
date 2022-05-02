const express = require("express");
const router = express.Router();
const DataCache = require("../model/cache");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let checkResult = await DataCache.checkDataAge();
  console.log(checkResult.status);
  res.send();
});

router.post("/", async function (req, res, next) {
  res.send();
});

module.exports = router;
