import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/** Same name as API `CorrelationIdFilter.HEADER_REQUEST_ID` (`X-Request-Id`). */
export const REQUEST_ID_HEADER = 'X-Request-Id';

export type RequestIdAttachConfig = {
	readonly apiUrl: string;
	readonly requestIdUrlPrefixes: readonly string[];
};

/**
 * Pure helper for tests and for documenting match rules.
 * Attaches when the URL starts with any entry in `requestIdUrlPrefixes`, or starts with `apiUrl` when `apiUrl` is non-empty.
 */
export function shouldAttachRequestId(url: string, config: RequestIdAttachConfig): boolean {
	for (const prefix of config.requestIdUrlPrefixes) {
		if (prefix.length > 0 && url.startsWith(prefix)) {
			return true;
		}
	}
	const base = config.apiUrl;
	return base.length > 0 && url.startsWith(base);
}

/**
 * Adds a fresh UUID per HTTP call so the API can correlate logs with the browser.
 * Which URLs get the header is controlled by `environment.requestIdUrlPrefixes` and `environment.apiUrl`.
 */
export const requestIdInterceptor: HttpInterceptorFn = (req, next) => {
	const config: RequestIdAttachConfig = {
		apiUrl: environment.apiUrl,
		requestIdUrlPrefixes: environment.requestIdUrlPrefixes,
	};
	if (!shouldAttachRequestId(req.url, config)) {
		return next(req);
	}
	const id = crypto.randomUUID();
	return next(req.clone({ setHeaders: { [REQUEST_ID_HEADER]: id } }));
};
