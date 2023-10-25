if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); //masukkan ini1
}
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");

const { Category, Counselor, Customer, History } = require("./models");
const { signToken, decodeToken } = require("./helper/jwt");
const { comparePassword } = require("./helper/bcrypt");
const { CustomerAuth, CounselortAuth } = require("./authentication/authentication");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/counselor/login", async(req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });
    const counselor = await Counselor.findOne({ where: { email } });
    if (!counselor) return res.status(401).json({ message: "Invalid email/password" });
    const compare = comparePassword(password, counselor.password);
    if (!compare) return res.status(401).json({ message: "Invalid email/password" });
    console.log(">>>>",counselor, "<<<");

    
    if (counselor.status === "available") {
      console.log("Status already available");
    } else {
      await counselor.update({ status: "available" });
      console.log(counselor, "<<");
    }
    
    const access_token = signToken({ id: counselor.id });
    res.status(201).json({ access_token: access_token, id: counselor.id, name:counselor.name, email: counselor.email, role: counselor.role, status: counselor.update});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/counselor/:counselorId", async (req,res) => {
  try {
    const { counselorId } = req.params;
    const findById = await Counselor.findByPk(counselorId);
    // console.log(findById, "<<<");
    res.status(200).json(findById);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });   
  }
})

app.get("/counselor/histories", CounselortAuth , async (req, res) => {
  try {
    const findHistory = await History.findAll({
      include: [
        {
          model: Customer,
          attributes: { exclude: ["email", "password", "createdAt", "updatedAt"] }
        },
        {
          model: Counselor,
          attributes: { exclude: ["email", "password", "createdAt", "updatedAt"] }
        },
      ],
      where: { counselorId : req.user.id }
    });
    res.status(200).json(findHistory);
  } catch (error) {
    console.log(error, "<<");
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/cust/register", async (req, res) => {
  try {
    let customer = await Customer.create(req.body);
    // console.log(customer.email);
    res.status(201).json({
      id: customer.id,
      email: customer.email,
    });
  } catch (error) {
    console.log(error);
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      res.status(400).json({ message: error.errors[0].message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.post("/cust/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });
    const customer = await Customer.findOne({ where: { email } });
    // console.log(customer, "<<");
    if (!customer) return res.status(401).json({ message: "Invalid email/password" });
    const compare = comparePassword(password, customer.password);
    console.log(compare, "<<<<<<compare");
    if (!compare) return res.status(401).json({ message: "Invalid email/password" });
    const access_token = signToken({ id: customer.id });
    // console.log(customer, "<<");
    res.status(201).json({ id: customer.id ,access_token: access_token, email: customer.email, role: customer.role, name: customer.email});
  } catch (error) {
    console.log(error, "<<<");
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/cust/categories", async (req, res) => {
  try {
    const category = await Category.findAll();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/cust/:customerId", async (req,res) => {
  try {
    const { customerId } = req.params;
    const findById = await Customer.findByPk(customerId);
    // console.log(findById, "<<<");
    res.status(200).json(findById);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });   
  }
})
app.get("/cust/counselor/:categoryId", CustomerAuth ,async (req, res) => {
  try {
    const { categoryId } = req.params;
    const conselor = await Counselor.findAll({
      include: [
        {
          model: Category,
          attributes: { exclude: ["description", "createdAt", "updatedAt"] },
        },
        {
          model: History,
          attributes: ["rating"],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "email", "password", "role"],
      },
      where: { categoryId },
    });

    conselor.forEach(con => {
      con.rating = con.Histories.reduce((p, c) => p + c.rating, 0)/con.Histories.length || 0
    });
    res.status(200).json(conselor);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/cust/:counselorId/generateInvoice", CustomerAuth , async (req, res) => {
  try {
    const { counselorId } = req.params;
    const findById = await Counselor.findByPk(counselorId);
    // console.log(">>",findById);
    const { data } = await axios({
      url: "https://api.xendit.co/v2/invoices",
      method: "post",
      auth: {
        username: process.env.XENDIT_API,
        password: "",
      },
      data: {
        external_id: `invoice-ticketCounseling`,
        amount: findById.fee,
        payer_email: req.user.email,
        success_redirect_url: "http://localhost:5173/talk-cust",
        should_send_email: true,
      },
    });
    res.status(201).json({ message: "Success", data });
    // res.status(200).json(findById)
  } catch (error) {
    console.log(error, "<<<");
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/cust/histories/:counselorId",CustomerAuth, async (req, res) => {
  try {
    const { counselorId } = req.params;
    const { rating } = req.body;
    const findById = await Counselor.findByPk(counselorId);
    // console.log(findById, "<<<");
    const history = await History.create({
      counselorId,
      customerId: req.user.id,
      price: findById.fee,
      rating,
    });
    res.status(201).json(history);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
});

app.get("/cust/histories",CustomerAuth , async (req, res) => {
  try {
    const findHistory = await History.findAll({
      include: [
        {
          model: Customer,
          attributes: { exclude: ["email", "password", "createdAt", "updatedAt"] },
        },
        {
          model: Counselor,
          attributes: { exclude: ["email", "password", "createdAt", "updatedAt"] },
        },
      ],
      where: { customerId : req.user.id }
    });
    res.status(200).json(findHistory);
  } catch (error) {
    console.log(error, "<<");
    res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
