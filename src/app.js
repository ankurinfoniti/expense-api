const express = require("express");
require("dotenv").config();

const sequelize = require("./config/database");

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

const authRouter = require("./routes/auth");

app.use("/", authRouter);

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
