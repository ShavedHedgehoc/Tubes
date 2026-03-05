import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from "@nestjs/common";
import { Request, Response } from "express";

interface NestErrorResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = exception.getResponse() as NestErrorResponse;
    const errors = errorResponse.message || "Ошибка валидации";

    const customResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errors: Array.isArray(errors) ? errors : [errors],
      message: Array.isArray(errors) ? errors[0] : errors,
    };

    response.status(status).json(customResponse);
  }
}
