const CustomError = require("./custom-api");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
