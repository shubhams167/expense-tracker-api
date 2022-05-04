const mongoose = require("mongoose");
const {
	hashPassword,
	comparePassword,
	validateEmail,
} = require("../utils/auth");

const userSchema = mongoose.Schema({
	firstName: { type: String, required: "First name is required", trim: true },
	lastName: { type: String, required: false },
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: "Email address is required",
		validate: [validateEmail, "Email address is invalid"],
	},
	password: {
		type: String,
		required: "Password is required",
	},
});

userSchema.methods.hashPassword = async function () {
	this.password = await hashPassword(this.password);
};

userSchema.methods.isPasswordCorrect = async function (plainTextPassword) {
	const result = await comparePassword(plainTextPassword, this.password);
	return result;
};

module.exports = mongoose.model("User", userSchema);
