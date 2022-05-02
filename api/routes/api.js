var express = require("express");
var router = express.Router();


/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send();
});

router.post("/", async function (req, res, next) {
  res.send();
});

module.exports = router;
