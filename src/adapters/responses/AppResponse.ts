export class AppResponse {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly length?: number;
  public readonly fileUrl?: string;
  public readonly fileName?: string;

  constructor(
    message: string,
    statusCode = 200,
    length?: number,
    fileUrl?: string,
    fileName?: string,
  ) {
    Object.assign(this, {
      message,
      statusCode,
      length,
      fileName,
      fileUrl,
    });
  }
}
