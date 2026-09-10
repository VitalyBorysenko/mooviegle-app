import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthStateService } from 'src/app/auth/auth-state.service';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { AuthService } from 'src/app/auth/auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;

  private loginInfo!: AuthLoginInfo;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    private authState: AuthStateService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  formControl(control: string) {
    return this.loginForm.get(control);
  }

  login(): void {
    if (this.loginForm.invalid || this.isSubmitting) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.loginInfo = new AuthLoginInfo(
      this.loginForm.value.email,
      this.loginForm.value.password,
      true,
    );

    this.authService.auth(this.loginInfo).subscribe({
      next: (data) => {
        this.authState.setSession(data.idToken, data.email, data.localId);
        this.isSubmitting = false;
        this.dialogRef.close(true);
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openDialogReg(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'register-custom-styles';
    this.dialog.open(RegisterComponent, dialogConfig);
  }

  regNewUser(): void {
    this.closeDialog();
    this.openDialogReg();
  }
}
