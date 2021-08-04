import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { Customer } from './customer';

function ratingRange(c: AbstractControl) {
  if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { range: true };
  } else if (c.value !== null && c.value % 1 !== 0) {
    return { modulus: true };
  }
  return null;
}

// custom validator with params (factory function in order to have more than one argument)
function myValidator(min: number, max: number): ValidatorFn {
  return (c: AbstractControl) => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      console.log({ range: max });
      return { range: { min, max } };
    } else if (c.value !== null && c.value % 1 !== 0) {
      return { modulus: true };
    }
    return null;
  };
}

function rating(min, max) {
  return (c: AbstractControl) => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { range: true }
    }
    return null;
  }
}

//  compare if two emails are the same
function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  console.log('ok');
  return { match: true };
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer(); // data model sent to the backend
  emailMessage: string;

  private validationMessages = {
    required: 'Please enter your email address',
    email: 'Please enter a valid email address'
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [
        Validators.minLength(3), Validators.required]],
      lastName: [{ value: '', disabled: false }, [
        Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, { validator: emailMatcher }),
      email: ['', [
        Validators.required, Validators.email]],
      phone: '',
      notification: 'email',
      rating: [null, myValidator(4, 10)],
      ratingDefault: [null, ratingRange],
      sendCatalog: (true),
      availability: this.fb.group({
        start: ['', Validators.required],
        end: ['', Validators.required]
      }),
      addresses: this.fb.array([this.buildAddress()])
    });

    // this.populateTestData();
    this.customerForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value)
    );

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(
        value => this.setMessage(emailControl)
      );
  }

  save(): void {
    console.log(this.customerForm);
  }

  get firstName() {
    return this.customerForm.get('firstName');
  }

  get lastName() {
    return this.customerForm.get('lastName');
  }

  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    })
  }

  moar(): void {
    const form = this.customerForm.get('addresses') as FormArray;
    form.push(this.buildAddress());
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'Jack',
      sendCatalog: true
    })
  }

  setNotification(type: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (type === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }

}
