import BaseComponent from '../components/BaseComponent';
import Button from '../components/Button';
import Input from '../components/Input';
import RegForm from '../components/RegForm';

export default class RegistrationPage extends BaseComponent {
  regForm: RegForm;

  firstNameInput: Input;

  lastNameInput: Input;

  emailInput: Input;

  passwordInput: Input;

  submitBtn: Button;

  constructor() {
    super({
      tag: 'section',
      classes: ['reg', 'container'],
    });

    this.regForm = new RegForm({ classes: ['reg__form'] });
    this.firstNameInput = this.regForm.firstNameInput;
    this.lastNameInput = this.regForm.lastNameInput;
    this.emailInput = this.regForm.emailInput;
    this.passwordInput = this.regForm.passwordInput;
    this.submitBtn = this.regForm.submitBtn;

    this.append(this.regForm);
  }
}
