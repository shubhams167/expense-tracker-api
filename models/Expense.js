const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
	title: { type: String, required: true },
	amount: { type: Number, required: true },
});

module.exports = mongoose.model("Expense", expenseSchema);
