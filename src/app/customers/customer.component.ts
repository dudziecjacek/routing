import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Customer } from './customer';

function ratingRange(c: AbstractControl) {
  if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { range: true };
  } else if (c.value !== null && c.value % 1 !== 0) {
    return { modulus: true };
  }
  return null;
}

// custom validator with params
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
      })
    });

    this.populateTestData();
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


}
