export class APIError extends Error {
  constructor(message: string, code: string, status: number) {
    super(message);

    Object.setPrototypeOf(this, APIError.prototype);
    this.message = message;
    this.status = status;
    this.code = code;
  }

  public message: string;
  public code: string;
  public status: number;
}
