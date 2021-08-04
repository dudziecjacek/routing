import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControlName } from '@angular/forms';

function eloRatingVal(c: AbstractControl) {
  const { level, eloRating } = c.value;
  console.log(level, eloRating);
  let minElo;
  let maxElo;
  if (level === 'beginner') {
    minElo = 0;
    maxElo = 1400;
  } else if (level === 'normal') {
    minElo = 1401;
    maxElo = 1800;
  } else if (level === 'advanced') {
    minElo = 1801;
    maxElo = 2200;
  }
  if (eloRating < minElo || eloRating > maxElo) {
    return { wrongElo: true };
  }

  return null;
}

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {
  chessForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.chessForm = this.fb.group({
      chessName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', Validators.email],
      playerDetails: this.fb.group({
        level: ['', [Validators.min(0), Validators.max(2200)]],
        eloRating: [null]
      }, { validator: eloRatingVal })
    });
  }

  save(): void {
    console.log('saved');
  }

  isTouchedAndDirty(formName): boolean {
    console.log(formName.touched && formName.dirty && !formName.valid);
    return formName.touched && formName.dirty && !formName.valid;
  }

  get chessName() {
    return this.chessForm.get('chessName');
  }

  get email() {
    return this.chessForm.get('email') as FormGroup;
  }

  get level() {
    console.log(this.chessForm.get('playerDetails.level'));
    return this.chessForm.get('playerDetails.level');
  }

  get eloRating() {
    return this.chessForm.get('playerDetails.eloRating') as FormGroup;
  }

}
