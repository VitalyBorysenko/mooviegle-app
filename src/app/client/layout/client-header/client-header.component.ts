import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { LoginComponent } from '../../modals/login/login.component';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent implements OnInit {
arrowDown=faCaretDown;
  isLogined: boolean = false;
  userEmail!: string | null;

  constructor(
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLogined = true;
      this.userEmail = this.tokenStorage.getUserEmail();
    }
  }

  userLogin() {
    this.openDialogLogin();
  }

  openDialogLogin() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'register-custom-styles'

    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);
  }

  signOut() {
    this.tokenStorage.signOut();
    this.reloadPage();
  }

  reloadPage() {
    window.location.reload();
  }

}
