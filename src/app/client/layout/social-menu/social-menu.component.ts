import { Component, OnInit } from '@angular/core';
import { faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-social-menu',
  templateUrl: './social-menu.component.html',
  styleUrls: ['./social-menu.component.scss']
})
export class SocialMenuComponent implements OnInit {

  constructor() { }
  Facebook = faFacebookF;
  Twitter = faTwitter;
  Instagram = faInstagram;
  // YouTube = faYoutube;

  ngOnInit(): void {
  }

}
