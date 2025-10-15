require("dotenv").config();
var express = require("express");
var router = express.Router();
const userModel = require("./users");
const orderModel = require("./models/Order");

const localStrategy = require("passport-local");
const passport = require("passport");
passport.use(new localStrategy(userModel.authenticate()));

const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

// -------------------- MENU ROUTES --------------------
router.get("/", (req, res) => res.render("index"));
router.get("/about", (req, res) => res.render("about"));
router.get("/service", (req, res) => res.render("service"));
router.get("/gallery", (req, res) => res.render("gallery"));
router.get("/contact", (req, res) => res.render("contact"));
router.get("/review", (req, res) => res.render("review"));
router.get("/blog", (req, res) => res.render("blog"));
router.get("/temp", (req, res) => res.render("temp"));
router.get("/sucess", (req, res) => res.render("sucess"));
router.get("/blog1_card", (req, res) => res.render("blog1_card"));

// -------------------- AUTH --------------------
router.get("/signup", (req, res) => res.render("signup"));
router.post("/signup", (req, res) => {
  const { username, email, password, mobile } = req.body;
  const userData = new userModel({ username, email, mobile });
  userModel.register(userData, password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/");
    });
  });
});

router.get("/login", (req, res) =>
  res.render("login", { error: req.flash("error") })
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/index");
}

// -------------------- ORDER ROUTES --------------------
router.get("/order", (req, res) => res.render("order"));

router.post("/order", async (req, res) => {
  const { name, email, phone, address, product, quantity, message } = req.body;
  res.render("success", { name });
  try {
    // 1️⃣ Save order to MongoDB
    const newOrder = new orderModel({
      name,
      email,
      phone,
      product,
      quantity,
      message,
    });
    await resend.emails.send({
  from: "Your Name <onboarding@resend.dev>", // keep this or use verified domain
  to: "shivakoshti121@gmail.com",             // receiver
  subject: "✅ New Order Received",
  html: `
    <h2>New Order Details</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Product:</strong> ${product}</p>
    <p><strong>Quantity:</strong> ${quantity}</p>
    <p><strong>Message:</strong> ${message}</p>
  `,
});


    console.log("✅ Email sent successfully via Resend");
    res.render("sucess");
  } catch (error) {
    console.error("❌ Order processing error:", error);
    res.status(500).send("Something went wrong, please try again.");
  }
});

module.exports = router;
