const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const sequelize = require("./config/database");

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");

app.use("/", authRouter);
app.use("/", profileRouter);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connectDB();
