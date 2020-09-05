const express = require("express");
const router = express.Router();

const reportController = require("../controllers/report_controller");
console.log("router loaded");

router.get("/", (req, res) => {
  return res.status(200).json({
    msg: "hello",
  });
});

router.use("/doctors", require("./doctors.js"));
router.use("/patients", require("./patients.js"));
router.get("/reports/:status", reportController.getReportBystatus);

module.exports = router;
