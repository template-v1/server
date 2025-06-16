import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { Response as ResponseInterface } from '../response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();
    const request = ctx.getRequest();

    // Xác định mã trạng thái HTTP trả về
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Lấy thông điệp lỗi
    let message: string;
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      // Nếu res là object và có message thì lấy message, ngược lại lấy res
      if (typeof res === 'object' && res !== null && 'message' in res) {
        message = (res as any).message;
        // Nếu message là mảng (ví dụ lỗi validation), lấy phần tử đầu tiên
        if (Array.isArray(message)) {
          message = message[0];
        }
      } else {
        message = res as string;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    } else {
      message = 'Internal server error';
    }

    // Log lỗi ra console hoặc file
    this.logger.error(`Status ${status} Error: ${JSON.stringify(message)}`);

    // Chuẩn hóa response lỗi gửi về client theo interface Response
    const errorResponse: ResponseInterface = {
      statusCode: status,
      message,
    };

    response.status(status).json(errorResponse);
  }
}
