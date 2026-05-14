import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { REQUEST_ID_HEADER, requestIdInterceptor, shouldAttachRequestId } from './request-id.interceptor';

describe('requestIdInterceptor', () => {
	let http: HttpClient;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptors([requestIdInterceptor])),
				provideHttpClientTesting(),
			],
		});
		http = TestBed.inject(HttpClient);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('adds X-Request-Id for /api requests', () => {
		http.get('/api/v1/health').subscribe();
		const req = httpMock.expectOne('/api/v1/health');
		const header = req.request.headers.get(REQUEST_ID_HEADER);
		expect(header).toBeTruthy();
		expect(header!.length).toBeGreaterThan(0);
		req.flush({});
	});

	it('does not add X-Request-Id for unrelated URLs', () => {
		http.get('https://example.com/data').subscribe();
		const req = httpMock.expectOne('https://example.com/data');
		expect(req.request.headers.has(REQUEST_ID_HEADER)).toBe(false);
		req.flush({});
	});

	it('shouldAttachRequestId respects custom prefixes without /api', () => {
		expect(
			shouldAttachRequestId('https://api.other.com/v1/x', {
				apiUrl: '',
				requestIdUrlPrefixes: ['https://api.other.com'],
			}),
		).toBe(true);
		expect(
			shouldAttachRequestId('/graphql', {
				apiUrl: '',
				requestIdUrlPrefixes: ['/graphql'],
			}),
		).toBe(true);
		expect(
			shouldAttachRequestId('/public/ping', {
				apiUrl: '',
				requestIdUrlPrefixes: ['/graphql'],
			}),
		).toBe(false);
	});
});
