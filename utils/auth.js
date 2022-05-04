const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateEmail = email => {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

const hashPassword = async password => {
	const SALT_ROUNDS = 10;
	const hash = await bcrypt.hash(password, SALT_ROUNDS);
	return hash;
};

const comparePassword = async (plainTextPassword, hash) => {
	const match = await bcrypt.compare(plainTextPassword, hash);
	return match;
};

const generateJWT = async payload => {
	try {
		const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY);
		return token;
	} catch (err) {
		return "";
	}
};

const verifyJWT = async token => {
	try {
		const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
		return payload;
	} catch (err) {
		return "";
	}
};

module.exports = {
	validateEmail,
	hashPassword,
	comparePassword,
	generateJWT,
	verifyJWT,
};
