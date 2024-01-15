import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
})
export class PasswordInputComponent {
  password = '';
  color = 'gray';
  lastMatchedStepIndex = 0;

  isHighlighted() {}

  checkPassword() {
    const password = this.password;

    if (!password) {
      this.color = 'gray';
      this.lastMatchedStepIndex = -1;
    } else if (password.length < 8) {
      this.color = 'red';
      this.lastMatchedStepIndex = -1;
      return;
    }

    if (!password) {
      this.color = 'gray';
      return;
    }

    this.passwordStrenghtSteps.forEach((step, index) => {
      const result = step.regEx.test(password);
      if (result) this.lastMatchedStepIndex = index;
    });

    this.color = this.passwordStrenghtSteps[this.lastMatchedStepIndex].color;
  }

  passwordStrenghtSteps = [
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
}
