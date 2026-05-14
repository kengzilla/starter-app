export const environment = {
	production: true,
	/** Set via build args or replace with your API origin in deployment. */
	apiUrl: '/api',
	/** Extend when the app calls APIs outside `/api` (e.g. `['/api', 'https://api.company.com']`). */
	requestIdUrlPrefixes: ['/api'] as const,
};
