import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { requestIdInterceptor } from './core/interceptors/request-id.interceptor';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideAnimationsAsync(),
		providePrimeNG({
			theme: {
				preset: Aura,
			},
		}),
		provideHttpClient(withInterceptors([requestIdInterceptor])),
		provideRouter(routes),
	],
};
