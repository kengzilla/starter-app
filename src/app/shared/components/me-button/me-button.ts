import { Component, input } from '@angular/core';

@Component({
	selector: 'me-button',
	standalone: true,
	templateUrl: './me-button.html',
	styleUrl: './me-button.css',
})
export class MeButtonComponent {
	readonly variant = input<'primary' | 'secondary'>('primary');
	readonly loading = input(false);
	readonly disabled = input(false);
	readonly type = input<'button' | 'submit' | 'reset'>('button');

	protected isDisabled(): boolean {
		return this.disabled() || this.loading();
	}
}
