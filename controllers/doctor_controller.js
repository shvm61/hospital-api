const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltRounds = 10;

module.exports.register = async function (req, res) {
  try {
    let hash = await bcrypt.hash(req.body.password, saltRounds);

    // console.log(req.body);
    await Doctor.create({
      name: req.body.name,
      username: req.body.username,
      password: hash,
    });
    return res.status(200).json({
      response: "success",
      msg: "successfully created",
    });
  } catch (error) {
    // console.log(__filename, error);
    if (error.code === 11000) {
      return res.status(200).json({
        msg: "doctor already exists",
        data: error,
      });
    }
  }
};

module.exports.logIn = async function (req, res) {
  try {
    let doctor = await Doctor.findOne({ username: req.body.username });
    if (!doctor) {
      return res
        .status(422)
        .json({ response: "failed", msg: "Inavlid username or password" });
    }
    console.log(req.body);
    const match = await bcrypt.compare(req.body.password, doctor.password);
    // console.log("match", match);
    if (match)
      return res.status(200).json({
        response: "success",
        message: "Sign in successful, here is your token, please keep it safe!",
        data: {
          token: jwt.sign(doctor.toJSON(), process.env.JWT_KEY, {
            expiresIn: "36000000",
          }),
        },
      });
    else {
      return res
        .status(422)
        .json({ response: "failed", msg: "Inavlid username or password" });
    }
  } catch (error) {
    console.log("********", error);
    return res.status(500).json({ response: "failed", err: error });
  }
};
