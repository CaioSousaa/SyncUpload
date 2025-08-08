export class AppResponse {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly length?: number;

  constructor(message: string, statusCode = 200, length?: number) {
    this.statusCode = statusCode;
    this.message = message;
    this.length = length;
  }
}
