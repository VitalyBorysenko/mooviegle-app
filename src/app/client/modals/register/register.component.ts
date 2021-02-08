import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SignUpInfo } from 'src/app/auth/signup-info';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoggedIn = false;
  registerForm!: FormGroup;
  signupInfo!: SignUpInfo;
  private _subs: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    public _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  createForm() {
    this.registerForm = this.fb.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required],)
      },
      { validator: this.passwordConfirming('password', 'confirmPassword') }
    );
  }

  passwordConfirming(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmPassword];

      if (matchingControl.errors && !matchingControl.errors.invalid) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ invalid: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  formControl(control: string) {
    return this.registerForm.get(control)
  }

  closeDialog() {
    this.dialogRef.close();
  }

  authNewUser() {
    if (this.registerForm.valid) {
      this.signupInfo = new SignUpInfo(
        this.registerForm.value.email,
        this.registerForm.value.password,
        true);
      this._subs.add(this.authService.signUp(this.signupInfo).subscribe(data => {

        if (data.idToken) {
          this._snackBar.open('Реєстрація пройшла успішно.', 'Х', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.dialogRef.close();
        }
        this.tokenStorage.saveToken(data.idToken);
        this.tokenStorage.saveUserEmail(data.email);
        this.tokenStorage.saveUserId(data.localId);
        this.isLoggedIn = true;

        this.reloadPage()

      }));
    }

    else {
      this._snackBar.open('Заповніть форму', 'Х', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
