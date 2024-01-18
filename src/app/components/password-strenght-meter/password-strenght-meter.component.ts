import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { passwordStrenghtStep } from '../../core/models/password-strenght-step';
import { PasswordService } from '../../core/services/password.service';

@Component({
  selector: 'app-password-strenght-meter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-strenght-meter.component.html',
  styleUrl: './password-strenght-meter.component.scss',
  providers: [PasswordService],
})
export class PasswordStrenghtMeterComponent {
  @Input() password: string = '';

  ngOnChanges() {
    this.onPasswordChange();
  }

  passwordService: PasswordService = inject(PasswordService);

  color: string = 'gray';
  lastMatchedStepIndex: number = 0;
  passwordStrenghtSteps: passwordStrenghtStep[] = this.passwordService.passwordStrenghtSteps;

  onPasswordChange(): void {
    const {color, lastMatchedStepIndex} = this.passwordService.checkPassword(this.password);
    this.color = color;
    this.lastMatchedStepIndex = lastMatchedStepIndex;
  }
}
