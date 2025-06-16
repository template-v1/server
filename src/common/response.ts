export class Response<T = any> {
  statusCode: number;
  message: string;
  data?: T;

  constructor(statusCode?: number, message?: string, data?: T) {
    this.statusCode = statusCode;
    this.message = message;
    if (data !== undefined) {
      this.data = data;
    }
  }
}