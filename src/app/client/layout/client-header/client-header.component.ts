import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { AuthStateService } from 'src/app/auth/auth-state.service';
import { LoginComponent } from '../../modals/login/login.component';
import { SocialMenuComponent } from '../social-menu/social-menu.component';

@Component({
  standalone: true,
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss'],
  imports: [RouterLink, FontAwesomeModule, SocialMenuComponent],
})
export class ClientHeaderComponent implements OnInit {
  arrowDown = faCaretDown;

  constructor(
    private dialog: MatDialog,
    public authState: AuthStateService,
  ) { }

  ngOnInit(): void {
    this.authState.syncFromStorage();
  }

  userLogin(): void {
    this.openDialogLogin();
  }

  openDialogLogin(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'register-custom-styles';
    this.dialog.open(LoginComponent, dialogConfig);
  }

  signOut(): void {
    this.authState.clearSession();
  }
}
