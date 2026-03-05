export class ApiError extends Error {
  constructor(statusCode, message, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.success = false;
    Error.captureStackTrace(this, this.constructor);
  }
}
