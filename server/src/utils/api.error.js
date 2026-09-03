export default class ApiError extends Error {
  constructor(errorObj, errors = null) {
    super(errorObj.message);
    this.statusCode = errorObj.statusCode;
    this.code = errorObj.code;
    this.errors = errors;
  }
}
