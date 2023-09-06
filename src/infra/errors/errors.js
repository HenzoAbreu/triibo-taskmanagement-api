class CustomError extends Error {
  constructor(data) {
    super(data);
    this.customData = data.data;
    this.status = data.status;
    this.customErr = true;
  }
}

// user errors

const NewMissingFieldErr = (fieldName) => {
  return new CustomError({
    status: 422,
    data: {
      error_type: "MissingFieldError",
      fieldName,
      message: `Missing field: ${fieldName}`,
    },
  });
};

const NewInvalidFieldErr = (fieldName) => {
  return new CustomError({
    status: 422,
    data: {
      error_type: "InvalidFieldError",
      fieldName,
      message: `Invalid field: ${fieldName}`,
    },
  });
};

const NewAlreadyRegisteredErr = (fieldName) => {
  return new CustomError({
    status: 401,
    data: {
      error_type: "AlreadyRegistered",
      message: `User with this ${fieldName} already exists!`,
    },
  });
};

const NewInvalidCredentialErr = () => {
  return new CustomError({
    status: 401,
    data: {
      error_type: "InvalidCredential",
      message: `Email or password is incorrect!`,
    },
  });
};

const NewUnauthorizedErr = () => {
  return new CustomError({
    status: 403,
    data: {
      error_type: "Unauthorized",
      message: `Not allowed to perform this action!`,
    },
  });
};

const NewInvalidUsernameErr = () => {
  return new CustomError({
    status: 422,
    data: {
      error_type: "InvalidUsername",
      message: `Username must have minimum of 5 characters and maximum 20!`,
    },
  });
};

const NewInvalidPasswordErr = () => {
  return new CustomError({
    status: 422,
    data: {
      error_type: "InvalidUsername",
      message: `Password must have minimum of 6 characters!`,
    },
  });
};

// task errors

const NewInvalidStatusErr = () => {
  return new CustomError({
    status: 422,
    data: {
      error_type: "InvalidStatus",
      message: `Task status must be pending, doing or done.`,
    },
  });
};

const NewMissingTokenErr = () => {
  return new CustomError({
    status: 401,
    data: {
      error_type: "MissingToken",
      message: `Authentication failed, missing token!`,
    },
  });
};

const NewInvalidTokenErr = () => {
  return new CustomError({
    status: 403,
    data: {
      error_type: "InvalidToken",
      message: `Invalid token!`,
    },
  });
};

const NewTaskNotFoundErr = () => {
  return new CustomError({
    status: 404,
    data: {
      error_type: "TaskNotFound",
      message: `A task with the given id was not found.`,
    },
  });
};

module.exports = {
  NewInvalidFieldErr,
  NewMissingFieldErr,
  NewAlreadyRegisteredErr,
  NewInvalidCredentialErr,
  NewInvalidUsernameErr,
  NewInvalidPasswordErr,
  NewInvalidStatusErr,
  NewMissingTokenErr,
  NewInvalidTokenErr,
  NewTaskNotFoundErr,
  NewUnauthorizedErr,
};
