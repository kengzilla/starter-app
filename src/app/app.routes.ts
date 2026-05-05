import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./layout/main-layout/main-layout').then((m) => m.MainLayoutComponent),
		children: [
			{ path: '', pathMatch: 'full', redirectTo: 'home' },
			{
				path: 'home',
				loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
			},
		],
	},
];
