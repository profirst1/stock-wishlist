const express = require("express");
const router = express.Router();
const Stock = require("../models/stock");

router.get("/", async (req, res) => {
  const allstocks = await Stock.find();
  res.render("stocks", { array1: allstocks });
});

// router.get("/:id", async (req, res) => {
//   const stock = await Stock.findById(req.params.id);
//   res.render("single", { stock: stock });
// });
router.get("/:id/view-details", async (req, res) => {
  const stock = await Stock.findById(req.params.id);
  res.render("single", { stock: stock });
});
router.get("/:id/edit", async (req, res) => {
  const stock = await Stock.findById(req.params.id);
  res.render("edit", { stock: stock });
  // get a form with data
});
router.put("/:id", async (req, res) => {
  // res.send("Edit a stock with", req.params.id);
  const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  stock.save();
  res.redirect("/stock");
});
router.delete("/:id", async (req, res) => {
  // res.send("delete a stock with:", req.params.id);
  const stock = await Stock.findById(req.params.id).deleteOne();
  res.redirect("/stock");
});

module.exports = router;
