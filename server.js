const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const connectDB = require("./database/db");
const Address = require("./models/addressSchema");
const dotenv = require("dotenv");
const Course = require("./models/courseSchema");
dotenv.config();

connectDB();
const port = 3000;
app.use(express.json());
const static_path = path.join(__dirname, "/Website/html-items/cursus-project");
const view_path = path.join(__dirname, "/Website/html-items/cursus-project");
// console.log(static_path);
app.use(express.static(static_path));
app.set("views", view_path);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send("Hello bro")
  res.render("index.ejs");
});
app.get("/checkout_membership", async (req, res) => {
  try {
    const member = await Address.find();
    res.render("checkout_membership", { member });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/create_new_course", async (req, res) => {
  try {
    const member = await Address.find();
    res.render("create_new_course", { member });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/new_course", async (req, res) => {
  try {
    console.log(req.body);
    const course = new Course({
      data: req.body,
    });
    const a1 = await course.save();

    res.status(200).redirect("/create_new_course");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/:page", function (req, res) {
  page = req.params.page;
  res.render(page);
});
app.post("/checkout", async (req, res) => {
  try {
    const member = await Address.updateOne(
      { _id: "64b6e1b70c4da486288a675d" },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          academyname: req.body.academyname,
          address1: req.body.address1,
          address2: req.body.address2,
          city: req.body.city,
          state: req.body.state,
          zipcode: req.body.zipcode,
          phone: req.body.phone,
        },
      }
    );
    res.status(200).redirect("/checkout_membership");
  } catch (error) {
    res.send(400).send(error);
  }
});

//Stripe
const stripe = require("stripe")(process.env.stripe_api);

const YOUR_DOMAIN = "http://localhost:3000";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Baby Plan",
          },
          unit_amount: 5100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/successCheckout.html`,
    cancel_url: `${YOUR_DOMAIN}/cancelCheckout.html`,
  });
  res.redirect(303, session.url);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
