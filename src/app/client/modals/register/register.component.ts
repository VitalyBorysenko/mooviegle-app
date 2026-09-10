import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthStateService } from 'src/app/auth/auth-state.service';
import { AuthService } from 'src/app/auth/auth.service';
import { SignUpInfo } from 'src/app/auth/signup-info';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  isSubmitting = false;
  signupInfo!: SignUpInfo;

  private readonly _subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authState: AuthStateService,
    public _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RegisterComponent>,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  createForm(): void {
    this.registerForm = this.fb.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validator: this.passwordConfirming('password', 'confirmPassword') }
    );
  }

  passwordConfirming(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmPassword];

      if (matchingControl.errors && !matchingControl.errors['invalid']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ invalid: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  formControl(control: string) {
    return this.registerForm.get(control);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  authNewUser(): void {
    if (this.registerForm.invalid || this.isSubmitting) {
      this.registerForm.markAllAsTouched();
      this._snackBar.open('Заповніть форму', 'Х', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    this.isSubmitting = true;
    this.signupInfo = new SignUpInfo(
      this.registerForm.value.email,
      this.registerForm.value.password,
      true
    );

    this._subs.add(this.authService.signUp(this.signupInfo).subscribe({
      next: (data) => {
        this.isSubmitting = false;
        if (!data.idToken) {
          return;
        }

        this.authState.setSession(data.idToken, data.email, data.localId);
        this._snackBar.open('Реєстрація пройшла успішно.', 'Х', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.dialogRef.close(true);
      },
      error: () => {
        this.isSubmitting = false;
      }
    }));
  }
}
