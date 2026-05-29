import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';

export interface ApiResponse<T> {
  data: T | [];
  statusCode: number;
  message: string;
  errors: string | undefined;
}

export class ResponseError {
  @ApiResponseProperty()
  message: string;

  @ApiResponseProperty()
  code?: number;

  @ApiResponseProperty()
  name?: string;

  @ApiResponseProperty()
  payload?: Record<string, unknown>;
}

export class PaginationMeta {
  @ApiProperty({ example: 1, description: 'Current page number' })
  page: number;

  @ApiProperty({ example: 10, description: 'Items per page' })
  limit: number;

  @ApiProperty({ example: 100, description: 'Total count of items' })
  totalCount: number;
}

export class ListResponsePagination extends PaginationMeta {}
export class GenericResponse<T = any> {
  @ApiProperty({
    example: 200,
    description: 'HTTP status code',
    type: Number,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Operation successful',
    description: 'Response message',
    type: String,
  })
  message: string;

  @ApiProperty({
    description: 'Response data',
  })
  data: T;

  @ApiPropertyOptional({
    type: () => PaginationMeta,
    description: 'Pagination metadata (only present for paginated responses)',
    required: false,
  })
  meta?: PaginationMeta;

  @ApiProperty({
    example: '',
    description: 'Error message (empty string on success)',
    type: String,
    default: '',
  })
  errors?: string;

  constructor(partial?: Partial<GenericResponse<T>>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}

export const ApiGenericResponse = <T>(
  dataType: new (...args: any[]) => T,
  options?: { isArray?: boolean },
) => {
  class Response {
    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ example: 'Operation successful' })
    message: string;

    @ApiProperty({
      type: options?.isArray ? [dataType] : dataType,
      description: 'Response data',
    })
    data: T | T[];
  }

  Object.defineProperty(Response, 'name', {
    value: `GenericResponseOf${dataType.name}`,
  });

  return Response;
};

export const ApiGenericPaginatedResponse = <T>(
  dataType: new (...args: any[]) => T,
) => {
  class Response {
    @ApiProperty({
      example: 200,
      description: 'HTTP status code',
      type: Number,
    })
    statusCode: number;

    @ApiProperty({
      example: 'Operation successful',
      description: 'Response message',
      type: String,
    })
    message: string;

    @ApiProperty({
      type: [dataType],
      description: 'Array of response data',
    })
    data: T[];

    @ApiProperty({
      type: () => PaginationMeta,
      description: 'Pagination metadata',
    })
    meta: PaginationMeta;
  }

  Object.defineProperty(Response, 'name', {
    value: `GenericArrayResponseOf${dataType.name}`,
  });

  return Response;
};

export const sendResponse = <T>(
  message: string,
  data?: T | [] | Record<string, unknown>,
  statusCode = 200,
  meta?: PaginationMeta,
): GenericResponse<T> => {
  const response: GenericResponse<T> = {
    statusCode,
    message,
    data: (data ?? []) as T,
  };

  // only include meta if its provided =>
  if (meta) {
    response.meta = meta;
  }

  return response;
};

export const errorResponse = <T = any>(
  code: number,
  message: string,
  errorMessage?: string,
): GenericResponse<T> => {
  return {
    data: [] as any,
    statusCode: code,
    message: message,
    errors: errorMessage ?? '',
  };
};

export const successResponse = <T>(
  message: string,
  data?: T | [] | Record<string, unknown>,
  meta?: PaginationMeta,
): GenericResponse<T> => {
  return sendResponse(message, data, 200, meta);
};

export const createdResponse = <T>(
  message: string,
  data?: T,
): GenericResponse<T> => {
  return sendResponse(message, data, 201);
};

export type ExtractDataType<T> = T extends GenericResponse<infer U> ? U : never;
export type PaginatedResponse<T> = GenericResponse<T[]> & {
  meta: PaginationMeta;
};
