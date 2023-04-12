const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {

  console.log(err)

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.msg || "Something went wrong",
  };

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  // if ((err.name = "ValidationError")) {
  //   // console.log(err.errors)
  //   customError.msg = Object.values(err.errors)
  //     .map((item) => {
  //       return item.message;
  //     })
  //     .join(",");
  //   customError.statusCode = 400;
  // }

  // if (err.name === "castError") {
  //   customError.msg = `no job found with id ${err.value}`;
  //   customError.statusCode = 400;
  // }

  // if (err.code && err.code === 11000) {
  //   (customError.statusCode = 400),
  //     (customError.msg = `Duplicate value entered for ${Object.keys(
  //       err.keyValue
  //     )} field, plz choose another value`);
  // }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  // return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
