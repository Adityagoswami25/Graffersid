const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  foundedOn: { type: Date, required: true },
  city: { type: String, required: true },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
