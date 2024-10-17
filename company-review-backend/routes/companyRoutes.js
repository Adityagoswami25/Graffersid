const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

router.post("/", async (req, res) => {
  try {
    const { name, location, foundedOn, city } = req.body;
    const company = new Company({ name, location, foundedOn, city });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
