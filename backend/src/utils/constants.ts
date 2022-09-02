type ErrorMessage = { status: number; message: string };

export const errorMessages = {
  noToken: {
    status: 400,
    message: "No token in the headers of the request",
  } as ErrorMessage,
  invalidToken: {
    status: 401,
    message: "The provided game token is invalid",
  } as ErrorMessage,

  notImplemented: {
    status: 501,
    message: "Not implemented",
  } as ErrorMessage,
};
