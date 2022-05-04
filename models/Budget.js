const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema({
	title: { type: String, required: true },
	expenditureDate: { type: Date, required: false },
	amount: { type: Number, required: true },
});

module.exports = mongoose.model("Budget", budgetSchema);
