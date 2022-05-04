const express = require("express");
const User = require("../models/User");
const { generateJWT, verifyJWT } = require("../utils/auth");
const router = express.Router();

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email }).exec();
		if (user) {
			if (await user.isPasswordCorrect(password)) {
				const jwt = await generateJWT({ email: user.email });
				res.json({ ok: true, msg: "Login successful", token: jwt });
			} else res.json({ ok: false, msg: "Password is incorrect" });
		} else {
			res.json({ ok: false, msg: "This email address is not registered" });
		}
	} catch (err) {
		res.status(500).json({ ok: false, msg: "Internal server error" });
	}
});

router.post("/signup", async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	const user = new User({
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: password,
	});

	await user.hashPassword();

	try {
		await user.save();
		res.json({ ok: true, msg: "Registration successful" });
	} catch (err) {
		res.json({ ok: false, msg: err.message });
	}
});

module.exports = router;
