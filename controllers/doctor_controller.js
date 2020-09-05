const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");

module.exports.register = async function (req, res) {
  try {
    //TODO encrypt passwords
    console.log(req.body);
    await Doctor.create(req.body);
    return res.status(200).json({
      response: "success",
      msg: "successfully created",
    });
  } catch (error) {
    // console.log(__filename, error);
    if (error.code === 11000) {
      return res.status(200).json({
        msg: "doctor already exists",
        err: error,
      });
    }
  }
};

module.exports.logIn = async function (req, res) {
  try {
    let doctor = await Doctor.findOne({ username: req.body.username });
    if (!doctor || doctor.password != req.body.password) {
      return res.status(422).json({ response: "failed", err: error });
    }

    return res.json(200, {
      response: "success",

      message: "Sign in successful, here is your token, please keep it safe!",
      data: {
        token: jwt.sign(doctor.toJSON(), process.env.JWT_KEY, {
          expiresIn: "36000000",
        }),
      },
    });
  } catch (error) {
    // console.log("********", err);
    return res.status(500).json({ response: "failed", err: error });
  }
};
