import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  standalone: true,
  selector: 'app-social-menu',
  templateUrl: './social-menu.component.html',
  styleUrls: ['./social-menu.component.scss'],
  imports: [FontAwesomeModule],
})
export class SocialMenuComponent {
  Facebook = faFacebookF;
  Twitter = faTwitter;
  Instagram = faInstagram;
}
