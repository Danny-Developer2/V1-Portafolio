import { HttpErrorResponse } from "@angular/common/http";

export type Errors = "BadRequest" | "ValidationError" | "ServerError" | "UnknownError" | "NotFoundError" | "UnauthorizedError";

export class BadRequest {
  type: Errors;
  message: string;
  validationErrors: string[] = [];
  error: HttpErrorResponse;

  constructor(error: HttpErrorResponse) {
    this.error = error;

    // Mensaje de error predeterminado
    this.message = error.error?.message || "An unexpected error occurred.";

    if (error.status === 400 && error.error?.errors) {
      this.type = "ValidationError";
      this.validationErrors = Object.values(error.error.errors)
        .flat()
        .map(err => String(err)); // Convierte cada error a string
    } else if (error.status === 401) {
      this.type = "UnauthorizedError";
      this.message = error.error?.message || "Unauthorized access. Please log in.";
    } else if (error.status === 404) {
      this.type = "NotFoundError";
      this.message = error.error?.message || "Page not found.";
    } else if (error.status === 500) {
      this.type = "ServerError";
    } else {
      this.type = "BadRequest";
    }
  }
}
