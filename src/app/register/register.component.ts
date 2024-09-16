import { JsonPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgFor, JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup
  submitted = false
  constructor(private fb: FormBuilder) {
    this.registerForm = fb.group({
      name: ['', Validators.required],
      userName: ['', [Validators.required, Validators.pattern('^\\S+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      confirmPassword: ['', Validators.required],
      addresses: fb.array([this.createAddress()])
    }, { validator: this.passwordMatchValidator })
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return  password === confirmPassword ? null : { mismatch: true };
  }
  handleSubmitForm() {
    this.submitted = true
    console.log(this.registerForm)
  }

  get name() { return this.registerForm.get('name') }
  get userName() { return this.registerForm.get('userName') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
  get confirmPassword() { return this.registerForm.get('confirmPassword') }
  get addresses(): FormArray {
    return this.registerForm.get('addresses') as FormArray;
  }

  createAddress(): FormGroup {
    return this.fb.group({
      address: ['', Validators.required],
      street: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  addAddress(): void {
    this.addresses.push(this.createAddress());
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }


}
