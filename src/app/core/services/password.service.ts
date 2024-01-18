import { Injectable } from '@angular/core';
import { passwordStrenghtStep } from '../../core/models/password-strenght-step';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor() {}

  passwordStrenghtSteps: passwordStrenghtStep[] = [
    {
      name: 'Only letters/digits/symbols',
      color: 'red',
      regEx: new RegExp(`^[a-zA-Z]+$|^[0-9]+$|^[^a-zA-Z0-9]+$`),
    },
    {
      name: 'Combination of letters-symbols/letters-digits/digits-symbols',
      color: 'orange',
      regEx: new RegExp(
        `^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$|^(?=.*[a-zA-Z])(?=.*[\\W_])[a-zA-Z\\W_]+$|^(?=.*[\\W_])(?=.*[0-9])[\\W_0-9]+$`
      ),
    },
    {
      name: 'Has letters, symbols and numbers ',
      color: 'green',
      regEx: new RegExp(`^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).+$`),
    },
  ];

  checkPassword(password: string): {
    color: string;
    lastMatchedStepIndex: number;
  } {
    let color: string = '';
    let lastMatchedStepIndex: number = -1;

    if (!password) {
      color = 'gray';
      lastMatchedStepIndex = -1;

      return { color, lastMatchedStepIndex };
    } else if (password.length < 8) {
      color = 'red';
      lastMatchedStepIndex = -1;

      return { color, lastMatchedStepIndex };
    }

    this.passwordStrenghtSteps.forEach((step, index) => {
      const result: boolean = step.regEx.test(password);
      if (result) lastMatchedStepIndex = index;
    });

    color = this.passwordStrenghtSteps[lastMatchedStepIndex].color;

    return { color, lastMatchedStepIndex };
  }
}
