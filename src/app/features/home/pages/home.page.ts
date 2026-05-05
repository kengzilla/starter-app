import { Component } from '@angular/core';
import { MeButtonComponent } from '../../../shared/components';

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [MeButtonComponent],
	templateUrl: './home.page.html',
	styleUrl: './home.page.css',
})
export class HomePage {}
