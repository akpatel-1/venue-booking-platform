export class ApiError extends Error {
  constructor(errorObj) {
    super(errorObj.message);
    this.statusCode = errorObj.statusCode;
    this.code = errorObj.code;
  }
}
