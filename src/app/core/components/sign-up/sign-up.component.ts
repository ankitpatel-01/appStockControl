import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {

  steps: step[] = [
    {
      step: 1,
      active: true,
      completed: false
    },
    {
      step: 2,
      active: false,
      completed: false
    },
    {
      step: 3,
      active: false,
      completed: false
    },
    {
      step: 4,
      active: false,
      completed: false
    },
    {
      step: 5,
      active: false,
      completed: false
    },
    {
      step: 6,
      active: false,
      completed: false
    },
  ]

  passwordField: { // Object for password field
    className: "hide" | "show"; // String property for password field visibility
  }

  confirmPasswordField: { // Object for password field
    className: "hide" | "show"; // String property for password field visibility
  }

  currentStep = 1;
  constructor() {
    // Initialize password field and login status
    this.passwordField = {
      className: "hide",
    };
    this.confirmPasswordField = {
      className: "hide",
    }
  }

  ngOnInit(): void {
  }

  showAddressDetails() {

  }

  next() {
    const currentStepper = this.steps.find(el => el.step == this.currentStep);
    const nextStepper = this.steps.find(el => el.step == (this.currentStep + 1));

    if (currentStepper) {
      currentStepper.completed = true;
      currentStepper.active = false;
    }

    if (nextStepper) {
      nextStepper.active = true;
      nextStepper.completed = false
    }

    const newcurrentStep = this.steps.find(el => el.active === true)?.step;
    if (newcurrentStep) {
      this.currentStep = newcurrentStep;
    }
  }

  prev() {
    const prevStepper = this.steps.find(el => el.step == (this.currentStep - 1));
    const currentStepper = this.steps.find(el => el.step == this.currentStep);

    if (prevStepper) {
      prevStepper.completed = false;
      prevStepper.active = true;
    }

    if (currentStepper) {
      currentStepper.active = false;
      currentStepper.completed = false
    }

    const newcurrentStep = this.steps.find(el => el.active === true)?.step;
    if (newcurrentStep) {
      this.currentStep = newcurrentStep;
    }
  }

  getStep(step: number): step | undefined {
    return this.steps.find(el => el.step === step);
  }

  findActiveStep(): number {
    return this.steps.find(el => el.active === true)?.step ?? 1;
  }

  /**
 * @description Toggle password visibility
 */
  public togglePasswordVisibility(): void {
    this.passwordField.className = this.passwordField.className === "hide" ? "show" : "hide";
  }

  /**
 * @description Toggle Confirm password visibility
 */
  public toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordField.className = this.confirmPasswordField.className === "hide" ? "show" : "hide";
  }

}

interface step {
  step: number;
  active: boolean;
  completed: boolean;
}
