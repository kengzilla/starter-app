export const environment = {
	production: false,
	apiUrl: '',
	/**
	 * HttpClient URLs starting with any of these strings receive `X-Request-Id`.
	 * Default `/api` matches the dev proxy; add more (e.g. `/graphql`, `https://api.example.com`) when needed.
	 */
	requestIdUrlPrefixes: ['/api'] as const,
};
