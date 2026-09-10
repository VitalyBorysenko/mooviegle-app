import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientFooterComponent } from '../layout/client-footer/client-footer.component';
import { ClientHeaderComponent } from '../layout/client-header/client-header.component';

@Component({
  standalone: true,
  selector: 'app-load-client',
  templateUrl: './load-client.component.html',
  styleUrls: ['./load-client.component.scss'],
  imports: [ClientHeaderComponent, ClientFooterComponent, RouterOutlet],
})
export class LoadClientComponent { }
