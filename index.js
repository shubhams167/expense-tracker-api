const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const expensesRoute = require("./routes/expenses");
const budgetsRoute = require("./routes/budgets");
const authRoute = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/expenses", expensesRoute);
app.use("/api/budgets", budgetsRoute);
app.use("/api", authRoute);

app.get("/", (req, res) => {
	res.send("Working!");
});

mongoose.connect(process.env.DB_CONN_STRING, {}, () =>
	console.log("Connected to DB!")
);

app.listen(8080, () => {
	console.log("server started");
});
