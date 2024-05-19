import BaseComponent from './BaseComponent';
import Button from './Button';
import Input from './Input';
import Label from './Label';

export default class LoginForm extends BaseComponent {
  email: Input;

  password: Input;

  submit: Button;

  passwordCheckbox: Input;

  regLink: BaseComponent;

  constructor() {
    super({ tag: 'form', classes: ['login__form'] });
    this.email = new Input({
      type: 'text',
      id: 'login-email',
      classes: ['login__input'],
    });
    const emailLabel = new Label({
      forStr: 'login-email',
      text: 'email',
      classes: ['login__label'],
    });
    const emailTip = new BaseComponent({
      text: '- incorrect email',
      classes: ['login__tip'],
    });
    const emailContainer = new BaseComponent(
      { classes: ['login__box'] },
      emailLabel,
      this.email,
      emailTip,
    );

    this.password = new Input({
      type: 'password',
      id: 'login-pass',
      classes: ['login__input'],
    });
    this.passwordCheckbox = new Input({
      type: 'checkbox',
      id: 'login-pass-check',
      classes: ['login__checkbox'],
    });
    const passwordCheckboxLabel = new Label({
      forStr: 'login-pass-check',
      text: 'show',
      classes: ['login__label-checkbox'],
    });
    const passwordLabel = new Label({
      forStr: 'login-pass',
      text: 'password',
      classes: ['login__label'],
    });
    const passwordTip = new BaseComponent({
      text: '- minimum length 8 characters\n- one uppercase letter (A-Z)\n- one lowercase letter (a-z)\n- contain at least one digit (0-9)\n-  contain at least one special character (e.g., !@#$%^&*)\n- must not contain leading or trailing whitespace',
      classes: ['login__tip'],
    });
    const passwordContainer = new BaseComponent(
      { classes: ['login__box'] },
      this.passwordCheckbox,
      passwordCheckboxLabel,
      passwordLabel,
      this.password,
      passwordTip,
    );

    this.submit = new Button({ text: 'login', classes: ['login__btn'] });

    this.regLink = new BaseComponent({
      tag: 'a',
      text: 'create one',
      classes: ['login__reg-link'],
    });
    const regLinkText = new BaseComponent({
      tag: 'p',
      text: 'No account?',
      classes: ['login__reg-text'],
    });
    const regLinkContainer = new BaseComponent(
      { classes: ['login__reg-box'] },
      regLinkText,
      this.regLink,
    );

    this.appendChildren([
      emailContainer,
      passwordContainer,
      this.submit,
      regLinkContainer,
    ]);
  }
}
