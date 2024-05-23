module.exports = {
  // Bad Request (Client Errors)
  BAD_REQUEST: "Invalid request data. Please check your input.",
  VALIDATION_ERROR: "Validation failed. Please ensure all fields are valid.",
  INVALID_PARAMETERS: "Invalid parameters provided.",

  // Not Found (Client Errors)
  NOT_FOUND: "Resource not found.",
  USER_NOT_FOUND: "User not found.",

  // Unauthenticated/Unauthorized (Client Errors)
  UNAUTHENTICATED: "Authentication required. Please log in.",

  UNAUTHORIZED: "You do not have permission to access this.",
  INVALID_CREDENTIALS: "Invalid username or password.",
  MISSING_CREDENTIALS: "Please provide email and password",
  TOKEN_EXPIRED: "Your session has expired. Please log in again.",

  // Server Errors (Internal Errors)
  INTERNAL_SERVER_ERROR: "An unexpected error occurred on the server.",
  DATABASE_ERROR: "A database error occurred.",

  // Conflict Errors (Client Errors)
  CONFLICT: "The request could not be completed due to a conflict.",
  DUPLICATE_ENTRY: "A record with this data already exists.",
};
