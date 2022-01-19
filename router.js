var express = require("express");
var router = express.Router();
const func = require("./func");

// router.post("/", func.createKPI);
// router.get("/", func.getKPIs);
// router.get("/:id", func.getKPIById);
// router.put("/", func.setStatus);
router.put("/getDijkastra", func.getDijkastra);
router.put("/getBellmanFord", func.getBellmanFord);
router.put("/getFloydWarshall", func.getFloydWarshall);
router.put("/getKruskal", func.getKruskal);
router.put("/getPrims", func.getPrims);

// router.delete("/:id", func.deleteKPI);

module.exports = router;
