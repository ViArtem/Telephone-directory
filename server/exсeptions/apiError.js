class ApiError extends Error {
  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.message = message;
  }
  // error during authorization
  static UnauthorizedError(message) {
    console.log(message);
    return new ApiError(401, message);
  }
  // request error
  static BadRequest(message, errors) {
    return new ApiError(400, message, (errors = []));
  }
  //error during refresh token validation
  static RefreshError(message, errors) {
    return new ApiError(403, message, (errors = []));
  }
}

export default ApiError;
