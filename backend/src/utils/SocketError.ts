export class SocketError extends Error {
  constructor(message: string, code: string) {
    super(message);

    Object.setPrototypeOf(this, SocketError.prototype);
    this.message = message;
    this.code = code;
  }

  public message: string;
  public code: string;
}
