import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthStateService } from 'src/app/auth/auth-state.service';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class LoginComponent {
  private readonly dialog = inject(MatDialog);
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<LoginComponent>);
  private readonly authService = inject(AuthService);
  private readonly authState = inject(AuthStateService);

  readonly loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  private isSubmitting = false;

  formControl(control: string) {
    return this.loginForm.get(control);
  }

  login(): void {
    if (this.loginForm.invalid || this.isSubmitting) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const loginInfo = new AuthLoginInfo(
      this.loginForm.value.email ?? '',
      this.loginForm.value.password ?? '',
      true,
    );

    this.authService.auth(loginInfo).subscribe({
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

  async regNewUser(): Promise<void> {
    this.closeDialog();
    const { RegisterComponent } = await import('../register/register.component');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'register-custom-styles';
    this.dialog.open(RegisterComponent, dialogConfig);
  }
}
