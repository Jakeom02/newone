import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
@Injectable()
export class ValidationService {
  constructor() {}

  getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config: any = {
      required: 'This field is required',
      requiredTrue: 'This field is required true',
      invalidCreditCard: 'Is invalid card number',
      email: 'Please enter valid email address',
      invalidEmailAddress: 'Please enter valid email address',
      invalidMobile: 'Please enter valid Mobile no',
      numericAllowed: 'Only numeric values are allowed',
      invalidPassword:
        'Please enter valid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimum length ${validatorValue.requiredLength}`,
      maxlength: `Max length ${validatorValue.requiredLength}`,
      mustMatch: 'Passwords must match',
      invalidDob: 'User must be minimum 16 Years old.',
      invalidUrl: 'Please enter valid URL',
      alphaNumericAllowed: 'Only apha numeric input is allowed',
      alphaAllowed: 'Please enter characters only.',
      LessThanToday: `Birth Date shouldn't be greater than today's`,
      invalidName: 'Special Character is not allowed',
      whitespace: 'please Enter Valid Data'
    };
    return config[validatorName];
  }
  emailValidator(control: any) {
    // RFC 2822 compliant regex
    // tslint:disable-next-line:max-line-length
    if (
      control.value &&
      control.value.match(
        /^[A-Za-z0-9!#$%&amp;'*+\/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&amp;'*+\/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/
    )) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }
  mobileValidator(control: any) {
    if (
      control.value &&
      control.value.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
    ) {
      return null;
    } else {
      return { invalidMobile: true };
    }
  }
  static numberValidator(control: AbstractControl) {
    if (control.value.length == 0 || control.value.match(/^[0-9]*$/)) {
      return null;
    } else {
      return { numericAllowed: true };
    }
  }
  static alpaNumValidator(control: AbstractControl) {
    if (control.value.match(/^[a-zA-Z0-9]*$/)) {
      return null;
    } else {
      return { alphaNumericAllowed: true };
    }
  }
  alphaValidator(control: AbstractControl) {
    if (control.value == null || control.value.match(/^[a-zA-Z\s]*$/)) {
      return null;
    } else {
      return { alphaAllowed: true };
    }
  }

  static urlValidator(control: AbstractControl) {
    const URL_REGEXP =
      /^(http?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|in|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    if (control.value.match(URL_REGEXP)) {
      return null;
    } else {
      return { invalidUrl: true };
    }
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  LessThanToday(control: any) {
    let today: Date = new Date();
    if (new Date(control.value) > today) {
      return { LessThanToday: true };
    } else {
      return null;
    }
  }
  specialCharacter(control: FormControl) {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    } else {
      return null;
    }

  }
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}
}
