import { Component, Input } from '@angular/core';
import { ValidationService } from './validation-messages.service';

@Component({
  selector: 'validation-messages',
  templateUrl: 'validation-messages.component.html',
  styleUrls: ['validation-messages.component.scss'],
})
export class ValidationMessagesComponent {
  @Input() control: any;
  @Input() message: string;
  errorName = null;
  constructor(private validationService: ValidationService) {}
  get errorMessage() {
    this.errorName = null;
    for (const propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.invalid &&
        this.control.dirty &&
        this.control.touched
      ) {
        if (
          this.control.errors.hasOwnProperty(propertyName) &&
          this.control.dirty &&
          this.control.touched &&
          propertyName == 'pattern'
        ) {
          return this.message;
        }
        return this.validationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}
