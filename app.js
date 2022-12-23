require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

//PACKAGES.
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//DATABASE.

//NOT ENOUGH TIME TO LEARN POSTGRES, HENCE I USED MONGODB,
//BUT I AM GOING TO STUDY AND LEARN HOW TO USE POSTGRES
const connectDB = require("./db/connect");

//ROUTERS.
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

//MIDDLEWARE.
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(process.env.JWT_SECRET_TOKEN));

//MOUNT ROUTERS.
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 7777;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
