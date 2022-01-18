var express = require("express");
var router = express.Router();
const func = require("./func");

// router.post("/", func.createKPI);
// router.get("/", func.getKPIs);
// router.get("/:id", func.getKPIById);
router.put("/", func.setStatus);
// router.delete("/:id", func.deleteKPI);

module.exports = router;
