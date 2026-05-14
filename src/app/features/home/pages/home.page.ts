import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { finalize } from 'rxjs';

import { environment } from '../../../../environments/environment';

/** Matches starter-api `ApiResponse` JSON for health. */
interface ApiEnvelope<T> {
	success: boolean;
	data?: T;
	message?: string;
	errorCode?: string;
	timestamp?: string;
}

interface HealthPayload {
	status: string;
	service: string;
	checkedAt: string;
}

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [Button],
	templateUrl: './home.page.html',
	styleUrl: './home.page.css',
})
export class HomePage {
	private readonly http = inject(HttpClient);

	/** Shown in template so devs see which URL `ng serve` will hit. */
	readonly healthUrlHint = `${environment.apiUrl || '/api'}/v1/health`;

	readonly healthLoading = signal(false);
	readonly healthResult = signal<ApiEnvelope<HealthPayload> | null>(null);
	readonly healthError = signal<string | null>(null);

	checkApiHealth(): void {
		this.healthLoading.set(true);
		this.healthResult.set(null);
		this.healthError.set(null);
		const base = environment.apiUrl || '/api';
		const url = `${base}/v1/health`;
		this.http
			.get<ApiEnvelope<HealthPayload>>(url)
			.pipe(finalize(() => this.healthLoading.set(false)))
			.subscribe({
				next: (body) => this.healthResult.set(body),
				error: (err: unknown) => this.healthError.set(this.formatHttpError(err)),
			});
	}

	private formatHttpError(err: unknown): string {
		if (err instanceof HttpErrorResponse) {
			const body = err.error as { message?: string } | null;
			if (body && typeof body.message === 'string') {
				return `${err.status}: ${body.message}`;
			}
			return `${err.status} ${err.statusText || 'Request failed'}`;
		}
		return err instanceof Error ? err.message : 'Request failed';
	}
}
