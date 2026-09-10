import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-client-footer',
  templateUrl: './client-footer.component.html',
  styleUrls: ['./client-footer.component.scss'],
  imports: [RouterLink],
})
export class ClientFooterComponent {
  year = new Date().getFullYear();
}
