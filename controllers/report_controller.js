const Patient = require("../models/patient");

module.exports.getReportBystatus = async function (req, res) {
  try {
    //   console.log("get reorts by status");
    const status = req.params.status;
    const patients = await Patient.find({}).populate({
      path: "reports",
      populate: {
        path: "createdBy",
        select: "name -_id",
      },
    });
    const reports = [];
    for (let i = 0; i < patients.length; i++) {
      for (let j = 0; j < patients[i].reports.length; j++) {
        if (patients[i].reports[j].status === status)
          reports.push(patients[i].reports[j]);
      }
    }
    return res.status(200).json({
      response: "success",
      data: reports,
    });
  } catch (error) {
    // console.log("********", err);
    return res.status(500).json({ response: "failed", err: error });
  }
};
