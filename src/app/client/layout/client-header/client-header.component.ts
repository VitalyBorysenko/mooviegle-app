import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { AuthStateService } from 'src/app/auth/auth-state.service';
import { SocialMenuComponent } from '../social-menu/social-menu.component';

@Component({
  standalone: true,
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FontAwesomeModule, SocialMenuComponent],
})
export class ClientHeaderComponent {
  private readonly dialog = inject(MatDialog);
  readonly authState = inject(AuthStateService);
  readonly arrowDown = faCaretDown;

  constructor() {
    this.authState.syncFromStorage();
  }

  async userLogin(): Promise<void> {
    const { LoginComponent } = await import('../../modals/login/login.component');
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
