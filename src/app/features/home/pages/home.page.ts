import { Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [Button],
	templateUrl: './home.page.html',
	styleUrl: './home.page.css',
})
export class HomePage {}
