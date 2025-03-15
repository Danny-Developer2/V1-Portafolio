import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { BadRequest } from '../../_models/badRequest';

export const InterceptorService: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        const errorInstance = new BadRequest(error);

        console.log(error)

        switch (error.status) {
          case 400:
            toastr.error(errorInstance.message, "400 - Bad Request");
            // Si el error contiene errores de validación, podrías mostrar más detalles
            if (errorInstance.validationErrors.length > 0) {
              toastr.error(errorInstance.validationErrors.join(', '), "Validation Errors");
            }
            throw errorInstance;

          case 401:
            toastr.error(errorInstance.message, "401 - Unauthorized");
            // Aquí podrías redirigir a la página de login si es necesario
            router.navigateByUrl('auth/login'); // O la ruta que uses para login
            throw errorInstance.error;

          case 404:
            toastr.error(errorInstance.message, "404 - Not Found");
            router.navigateByUrl('/404', { state: { error: errorInstance.message } });
            throw errorInstance.error;

          case 500:
            toastr.error(errorInstance.message, "500 - Server Error");
            router.navigateByUrl('/server-error', { state: { error: errorInstance.message } });
            throw errorInstance;
            
          default:
            toastr.error(errorInstance.message, "Unknown Error");
            throw errorInstance;
        }
      }
      throw error;
    })
  );
};
