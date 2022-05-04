const express = require("express");
const router = express.Router();
const expenses = require("../expenses");

router.get("/", (req, res) => {
	try {
		const limit = req.query.limit ? req.query.limit : expenses.length();
		res.json(expenses.slice(0, limit));
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post("/", (req, res) => {
	try {
		const expense = req.body;
		res.json(expenses.slice(0, limit));
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.get("/:id", (req, res) => {
	try {
		const expenseId = +req.params.id;
		const expense = expenses.find(expense => expense.id === expenseId);
		if (expense) res.json(expense);
		else res.status(404).json({ message: "Expense not found" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
