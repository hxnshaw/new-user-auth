const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "ERROR! PLEASE TRY AGAIN LATER!",
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  if (err.code && err.code === "11000") {
    customError.msg = `Duplicate value entered for ${object.keys(
      err.keyValue
    )}field, please choose a different value`;
    customError.status = 400;
  }

  if (err.name === "castError") {
    customError.msg = `No item with id:${err.value}`;
    customError.statusCode = 404;
  }
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
