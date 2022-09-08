require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const router = express.Router();
const Stock = require("./models/stock");
const methodOverride = require("method-override");

const path = require("path");
app.use("/static", express.static(path.join(__dirname, "public")));

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => {
  console.log("connected to mongoose");
});
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index");
});
app.post("/", async (req, res) => {
  const newstocks = new Stock({
    name: req.body.name,
    price: req.body.price,
  });
  await newstocks.save();
  res.redirect("/stock");
});
const stockRouter = require("./routes/stock");
app.use("/stock", stockRouter);

app.listen(process.env.PORT || port, () => {
  console.log("server running");
});
