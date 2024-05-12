import BaseComponent from './BaseComponent';
import Input from './Input';
import Button from './Button';
import Label from './Label';

export default class RegForm extends BaseComponent<HTMLFormElement> {
  firstNameLabel: Label;

  lastNameLabel: Label;

  emailLabel: Label;

  passwordLabel: Label;

  firstNameInput: Input;

  lastNameInput: Input;

  emailInput: Input;

  passwordInput: Input;

  submitBtn: Button;

  constructor(props: { classes?: string[] }) {
    super({ tag: 'form', classes: props.classes });

    // Initialize form
    this.firstNameLabel = new Label({
      forStr: 'firstNameInput',
      text: 'Input First Name',
      classes: ['label'],
    });
    this.firstNameInput = new Input({
      type: 'text',
      classes: ['input'],
      id: 'firstNameInput',
    });

    this.lastNameLabel = new Label({
      forStr: 'lastNameInput',
      text: 'Input Last Name',
      classes: ['label'],
    });
    this.lastNameInput = new Input({
      type: 'text',
      classes: ['input'],
      id: 'lastNameInput',
    });

    this.emailLabel = new Label({
      forStr: 'emailInput',
      text: 'Input Email',
      classes: ['label'],
    });
    this.emailInput = new Input({
      type: 'email',
      classes: ['input'],
      id: 'emailInput',
    });

    this.passwordLabel = new Label({
      forStr: 'passwordInput',
      text: 'Input password',
      classes: ['label'],
    });
    this.passwordInput = new Input({
      type: 'password',
      classes: ['input'],
      id: 'passwordInput',
    });

    this.submitBtn = new Button({
      text: 'Register',
      classes: ['submit-btn'],
    });

    // Append the form elements to the form

    this.append(this.firstNameLabel);
    this.append(this.firstNameInput);
    this.append(this.lastNameLabel);
    this.append(this.lastNameInput);
    this.append(this.emailLabel);
    this.append(this.emailInput);
    this.append(this.passwordLabel);
    this.append(this.passwordInput);
    this.append(this.submitBtn);
  }
}
