const CustomError = require("./custom-api");
const { StatusCodes } = require("http-status-codes");

class UnauthenticatedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
