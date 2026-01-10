export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Mongoose CastError
  if (err.name === "CastError") {
    message = `Resource not found. Invalid: ${err.path}`;
    statusCode = 400;
  }

  // Handle Mongoose ValidationError
  if (err.name === "ValidationError") {
    const validationErrors = Object.values(err.errors).map((e) => e.message);
    message = validationErrors.join(", ");
    statusCode = 400;
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};
