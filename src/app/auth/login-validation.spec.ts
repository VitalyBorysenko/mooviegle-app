import { TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';

describe('Login form validation', () => {
  it('should require email and minimum password length', () => {
    const form = TestBed.configureTestingModule({}).inject(FormBuilder).group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    expect(form.valid).toBe(false);

    form.setValue({ email: 'invalid', password: '123' });
    expect(form.get('email')?.valid).toBe(false);
    expect(form.get('password')?.valid).toBe(false);

    form.setValue({ email: 'user@test.com', password: 'password123' });
    expect(form.valid).toBe(true);
  });
});
