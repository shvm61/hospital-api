const Patient = require("../models/patient");

module.exports.register = async function (req, res) {
  try {
    await Patient.create({ phone: req.body.phone, name: req.body.name });
    return res.status(200).json({
      response: "success",
      msg: "patient successfully added",
    });
  } catch (error) {
    // console.log( err);
    return res.status(500).json({ response: "failed", err: error });
  }
};

module.exports.createReport = async function (req, res) {
  try {
    // console.log("create report");
    const id = req.params.id;
    // console.log(id);
    const report = {
      createdBy: req.user._id,
      status: req.body.status,
      date: new Date().toISOString(),
    };
    // console.log(report);
    const patient = await Patient.findById(id);

    patient.reports.push(report);
    patient.save();
    return res.status(200).json({
      response: "success",
      msg: "successfully created report",
    });
  } catch (error) {
    // console.log( err);
    return res.status(500).json({ response: "failed", err: error });
  }
};

function compare(a, b) {
  if (a.date < b.date) return -1;
  if (a.date > b.date) return 1;
  return 0;
}

module.exports.getAllReports = async function (req, res) {
  try {
    const id = req.params.id;
    const patient = await Patient.findById(id).populate({
      path: "reports",
      populate: {
        path: "createdBy",
        select: "name -_id",
      },
    });
    const reports = patient.reports;

    reports.sort(compare);
    return res.status(200).json({
      response: "success",
      name: patient.name,
      reports,
    });
    // console.log(reports);
  } catch (error) {
    // console.log( err);
    return res.status(500).json({ response: "failed", err: error });
  }
};
