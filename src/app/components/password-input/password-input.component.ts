import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PasswordStrenghtMeterComponent } from '../password-strenght-meter/password-strenght-meter.component';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordStrenghtMeterComponent],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PasswordInputComponent),
    multi: true,
  }]
})
export class PasswordInputComponent implements ControlValueAccessor {
  private onChange!: (value: string) => void;
  private onTouched!: () => void;
  
  password: string = "";

  onInputValueChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.password = value;
  }

  public writeValue(value: string): void {
    this.password = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
