import BaseComponent from '../components/BaseComponent';
import Button from '../components/Button';
import Input from '../components/Input';
import LoginForm from '../components/LoginForm';

export default class LoginPage extends BaseComponent {
  form: LoginForm;

  email: Input;

  password: Input;

  submit: Button;

  constructor() {
    super({ tag: 'section', classes: ['login', 'container'] });
    this.form = new LoginForm();
    this.email = this.form.email;
    this.password = this.form.password;
    this.submit = this.form.submit;

    this.append(this.form);
  }
}
