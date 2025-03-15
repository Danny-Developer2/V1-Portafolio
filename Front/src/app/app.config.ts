import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Importar HttpClient
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

import { routes } from './app-routing.module';
import { InterceptorService } from './services/interceptor/-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient((withInterceptors([InterceptorService]))),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right',
    }),
  ]
};
