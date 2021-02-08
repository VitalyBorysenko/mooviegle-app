import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { RegisterComponent } from '../register/register.component';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoggedIn = false;
  roles: any;

  private loginInfo!: AuthLoginInfo;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      })

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  formControl(control: any) {
    return this.loginForm.get(control)
  }

  login() {

    this.loginInfo = new AuthLoginInfo(
      this.loginForm.value.email,
      this.loginForm.value.password,
      true,
    );
    this.isLoggedIn = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.auth(this.loginInfo).subscribe(data => {
      this.tokenStorage.saveToken(data.idToken);
      this.tokenStorage.saveUserEmail(data.email);
      this.tokenStorage.saveUserId(data.localId);
      this.isLoggedIn = true;
      this.reloadPage();
    });
  }

  reloadPage() {
    window.location.reload();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openDialogReg() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'register-custom-styles'

    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);
  }

  regNewUser() {
    this.closeDialog();
    this.openDialogReg();
  }

}
