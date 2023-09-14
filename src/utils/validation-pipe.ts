import { ValidationErrorInterface } from "../interfaces/validation-error.interface";
import { catchError, OperatorFunction, throwError } from "rxjs";
import { AjaxError } from "rxjs/ajax";

export function validationPipe<T>(
  errorSetter: (error: ValidationErrorInterface) => void
): OperatorFunction<T, T> {
  return catchError((error: AjaxError) => {
    if (error.status === 422) {
      errorSetter(error.response.errors);
    }
    return throwError(() => error);
  });
}
