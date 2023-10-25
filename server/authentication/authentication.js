const { decodeToken } = require("../helper/jwt");
const {  Counselor, Customer } = require("../models");

const CounselortAuth = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) return res.status(401).json({ message: "Invalid token" });
    const decoded = decodeToken(access_token);
    const counselor = await Counselor.findByPk(decoded.id);
    if (!counselor) return res.status(401).json({ message: "Invalid token" });
    req.user = counselor;
    console.log(req.user, "<<<");
    next();
    // console.log(req.user.email, "<<<<");
  } catch (error) {
    if (error.name === "jsonWebTokenError") {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const CustomerAuth = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) return res.status(401).json({ message: "Invalid token" });
    const decoded = decodeToken(access_token);
    const customer = await Customer.findByPk(decoded.id);
    if (!customer) res.status(401).json({ message: "Invalid token" });
    req.user = customer;
    next();
    // console.log(req.user.email, "<<<<");
  } catch (error) {
    console.log(error);
    if (error.name === "jsonWebTokenError") {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports ={
  CounselortAuth,
  CustomerAuth
}

