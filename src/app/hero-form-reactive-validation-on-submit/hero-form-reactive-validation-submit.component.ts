import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-hero-form-reactive-validation-submit',
  templateUrl: './hero-form-reactive-validation-submit.component.html',
  styleUrls: ['./hero-form-reactive-validation-submit.component.scss']
})
export class HeroFormReactiveValidationComponentOnSubmitComponent implements OnInit {
  cardForm: FormGroup;

  // tslint:disable-next-line: max-line-length
  creditCardPattern = new RegExp('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$');
  countries = ['USA', 'Germany', 'Italy', 'France'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      cardNumber: ['', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern(this.creditCardPattern)
      ]],
      owner: this.fb.group({
        firstName: ['', [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ]],
        lastName: ['', [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required
        ]],
        height: ['', [
          Validators.min(120),
          Validators.max(220)
        ]]
      }),
      email: ['', [
        Validators.email
      ]],
      isAgreed: ['', [
        Validators.requiredTrue
      ]],
      originCountry: ['', [
        Validators.required
      ]]
    });
  }

  get cardNumber() { return this.cardForm.get('cardNumber'); }

  get firstName() { return this.cardForm.get('owner.firstName'); }

  get lastName() { return this.cardForm.get('owner.lastName'); }

  get height() { return this.cardForm.get('owner.height'); }

  get isAgreed() { return this.cardForm.get('isAgreed'); }

  onSubmit(e): void {
    e.preventDefault();
    if (this.cardForm.valid) {
      const result = Object.assign({}, this.cardForm.value);
      result.owner = Object.assign({}, this.cardForm.value.owner);
      console.log(result);
    } else {
      this.cardForm.markAllAsTouched();
    }

  }
}
