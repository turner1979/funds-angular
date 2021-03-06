import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FdzButton, FdzMessage } from '@fdz/models';
import { FdzFundService } from '@fdz/services';
import { FDZ_COLOURS } from '@fdz/config';

@Component({
  selector: 'fdz-add-fund-form',
  templateUrl: './fdz-add-fund-form.component.html',
  styleUrls: ['./fdz-add-fund-form.component.scss']
})
export class FdzAddFundFormComponent implements OnInit {

  colours = FDZ_COLOURS;
  fundNameErrorMessageOptions: FdzMessage = { text: ['Must be at least 2 characters long.'], type: 'error' };
  fundTargetErrorMessageOptions: FdzMessage = {
    text: [
      'Must be at least 1 character long.',
      'Must be number (whole numbers only)'
    ],
    type: 'error'
  };
  newFundForm: FormGroup;
  submitButtonOptions: FdzButton = { text: 'Add', type: 'submit' };

  @Output() newFundAdd = new EventEmitter<boolean>();
  @ViewChild('addFundNameInputElem') set addFundNameInputElem(input: ElementRef | null) {
    if (!input) {
      return;
    }
    setTimeout(() => { input.nativeElement.focus(); });
  }

  constructor(private fundService: FdzFundService) { }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.newFundForm = new FormGroup({
      fundColour: new FormControl(this.colours[0]),
      fundName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      fundTarget: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(12)
      ])
    });
  }

  onSubmit(): void {
    if (this.newFundForm.valid) {
      this.fundService.addFund({
        id: Math.random().toString(36).substr(2),
        colour: this.newFundForm.value.fundColour,
        current: 0,
        name: this.newFundForm.value.fundName,
        target: this.newFundForm.value.fundTarget
      }).then(() => {
        this.newFundAdd.emit(true);
      }).catch(() => {
        // Real world example would display error message in UI
      });

    }
  }

}
