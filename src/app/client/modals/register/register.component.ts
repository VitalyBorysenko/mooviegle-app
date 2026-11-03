import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthStateService } from 'src/app/auth/auth-state.service';
import { AuthService } from 'src/app/auth/auth.service';
import { SignUpInfo } from 'src/app/auth/signup-info';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly authState = inject(AuthStateService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialogRef = inject(MatDialogRef<RegisterComponent>);
  private readonly destroyRef = inject(DestroyRef);

  readonly registerForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordConfirming('password', 'confirmPassword') },
  );

  private isSubmitting = false;

  formControl(control: string) {
    return this.registerForm.get(control);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  authNewUser(): void {
    if (this.registerForm.invalid || this.isSubmitting) {
      this.registerForm.markAllAsTouched();
      this.snackBar.open('Заповніть форму', 'Х', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    this.isSubmitting = true;
    const signupInfo = new SignUpInfo(
      this.registerForm.value.email ?? '',
      this.registerForm.value.password ?? '',
      true,
    );

    this.authService.signUp(signupInfo).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (data) => {
        this.isSubmitting = false;
        if (!data.idToken) {
          return;
        }

        this.authState.setSession(data.idToken, data.email, data.localId);
        this.snackBar.open('Реєстрація пройшла успішно.', 'Х', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.dialogRef.close(true);
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }

  private passwordConfirming(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl) => {
      const group = formGroup as FormGroup;
      const control = group.controls[password];
      const matchingControl = group.controls[confirmPassword];

      if (matchingControl.errors && !matchingControl.errors['invalid']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ invalid: true });
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    };
  }
}
