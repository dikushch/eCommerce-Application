import BaseComponent from '../components/BaseComponent';
import Button from '../components/Button';
import Input from '../components/Input';
import LoginForm from '../components/LoginForm';

export default class LoginPage extends BaseComponent {
  form: LoginForm;

  email: Input;

  password: Input;

  submit: Button;

  passCheckbox: Input;

  regLink: BaseComponent;

  isEmailValid: boolean = false;

  isPassValid: boolean = false;

  constructor() {
    super({ tag: 'section', classes: ['login', 'container'] });
    this.form = new LoginForm();
    this.email = this.form.email;
    this.password = this.form.password;
    this.submit = this.form.submit;
    this.passCheckbox = this.form.passwordCheckbox;
    this.regLink = this.form.regLink;
    this.submit.disable();

    this.append(this.form);

    this.email.addListener('input', () => {
      this.isEmailValid = this.checkEmail();
      this.checkValidForm();
    });

    this.password.addListener('input', () => {
      this.isPassValid = this.checkPass();
      this.checkValidForm();
    });

    this.passCheckbox.addListener('change', () => {
      this.changePassVisibility();
    });

    this.form.addListener('submit', (e) => {
      e.preventDefault();
      this.dispathLoginEvent();
    });

    this.regLink.addListener('click', () => {
      this.dispatchGoToRegEvent();
    });
  }

  checkValidForm(): void {
    if (this.isEmailValid && this.isPassValid) {
      this.submit.enable();
    } else {
      this.submit.disable();
    }
  }

  checkEmail(): boolean {
    const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = this.email.getValue();
    if (regExp.test(value)) {
      this.email.removeClass('wrong');
      return true;
    }

    this.email.addClass('wrong');
    return false;
  }

  checkPass(): boolean {
    const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const value = this.password.getValue();
    if (regExp.test(value)) {
      this.password.removeClass('wrong');
      return true;
    }

    this.password.addClass('wrong');
    return false;
  }

  changePassVisibility(): void {
    if ((this.passCheckbox.getNode() as HTMLInputElement).checked) {
      this.password.setAttribute('type', 'text');
    } else {
      this.password.setAttribute('type', 'password');
    }
  }

  clearForm(): void {
    this.email.clearValue();
    this.password.clearValue();
  }

  dispathLoginEvent(): void {
    const email = this.email.getValue();
    const password = this.password.getValue();
    const event = new CustomEvent('login', {
      bubbles: true,
      detail: { email, password },
    });
    this.getNode().dispatchEvent(event);
  }

  dispatchGoToRegEvent(): void {
    const event = new CustomEvent('change-page', {
      bubbles: true,
      detail: '/register',
    });
    this.getNode().dispatchEvent(event);
  }
}
