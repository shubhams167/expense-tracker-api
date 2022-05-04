const express = require("express");
const router = express.Router();
const budgets = require("../budgets");

router.get("/", (req, res) => {
	try {
		res.json(budgets);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
