export class AppResponse {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 200) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
