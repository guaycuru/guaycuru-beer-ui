import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class Errors {

  static handleErrorResponse(rsp: HttpErrorResponse): Observable<any> {
    if (rsp instanceof Error) {
      console.error(rsp);
      return throwError(rsp as Error);
    }

    if (rsp.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(rsp.error);
      return throwError(rsp.error);
    } else {
      let httpErr: HttpError;
      // Treat status code 401 or 0 as Unauthenticated to work around a bug in IE10.
      // See: https://stackoverflow.com/questions/16081267
      if (rsp.status === 401 || rsp.status === 0) {
        httpErr = new UnauthenticatedError();
      } else if (rsp.status === 403) {
        httpErr = new UnauthorizedError();
      } else if (rsp.status === 400) {
        httpErr = new BadRequestError();
      } else if (rsp.status === 422) {
        httpErr = new UnprocessableEntityError();
      } else if (rsp.status === 409) {
        httpErr = new ConflictError();
      } else if (rsp.status === 429) {
        httpErr = new TooManyRequestsError();
      } else if (rsp.status === 404) {
        httpErr = new NotFoundError();
      } else {
        httpErr = new HttpError(rsp.status, "Unexpected error");
      }

      // If the response contains a JSON body, parse it as a structured error response
      if (rsp.headers.get('content-type') === 'application/json' && typeof rsp.error == 'object') {
        httpErr.message = rsp.error.message;
        httpErr.code = rsp.error.code;
        httpErr.details = rsp.error.details;
      }

      return throwError(httpErr);
    }
  }
}

export class HttpError {
  message: string;
  status: number;
  code?: string;
  details?: string[];

  constructor(status:number, message: string) {
    this.status = status;
    this.message = message
  }
}

export class NotFoundError extends HttpError {
  constructor() {
    super(404, "Not Found");
  }
}

export class UnauthenticatedError extends HttpError {
  constructor() {
    super(401, "Not Authenticated");
  }
}

export class UnauthorizedError extends HttpError {
  constructor() {
    super(403, "Not Allowed");
  }
}

export class BadRequestError extends HttpError {
  constructor() {
    super(400, "Bad Request");
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor() {
    super(422, "Unprocessable Entity");
  }
}

export class ConflictError extends HttpError {
  constructor() {
    super(409, "Conflict");
  }
}

export class TooManyRequestsError extends HttpError {
  constructor() {
    super(429, "Too Many Requests");
  }
}
