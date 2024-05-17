import BaseComponent from './BaseComponent';
import Input from './Input';
import Button from './Button';
import Label from './Label';
import Select from './Select';

export default class RegForm extends BaseComponent<HTMLFormElement> {
  firstNameInput: Input;

  lastNameInput: Input;

  emailInput: Input;

  passwordInput: Input;
  // add address

  streetInput: Input;

  cityInput: Input;

  postalCodeInput: Input;

  countryInput: Select;

  submitBtn: Button;

  constructor(props: { classes?: string[] }) {
    super({ tag: 'form', classes: props.classes });

    // Initialize form

    const firstNameDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const firstNameLabel = new Label({
      forStr: 'firstNameInput',
      text: 'First Name',
      classes: ['inputs__box-label'],
    });
    this.firstNameInput = new Input({
      type: 'text',
      classes: ['inputs__box-input'],
      id: 'firstNameInput',
    });
    firstNameDiv.append(firstNameLabel);
    firstNameDiv.append(this.firstNameInput);

    const lastNameDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const lastNameLabel = new Label({
      forStr: 'lastNameInput',
      text: 'Last Name',
      classes: ['inputs__box-label'],
    });
    this.lastNameInput = new Input({
      type: 'text',
      classes: ['inputs__box-input'],
      id: 'lastNameInput',
    });
    lastNameDiv.append(lastNameLabel);
    lastNameDiv.append(this.lastNameInput);

    const emailDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const emailLabel = new Label({
      forStr: 'emailInput',
      text: 'Email',
      classes: ['inputs__box-label'],
    });
    this.emailInput = new Input({
      type: 'Email',
      classes: ['inputs__box-input'],
      id: 'emailInput',
    });
    emailDiv.append(emailLabel);
    emailDiv.append(this.emailInput);

    const passwordDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const passwordLabel = new Label({
      forStr: 'passwordInput',
      text: 'Password',
      classes: ['inputs__box-label'],
    });
    this.passwordInput = new Input({
      type: 'password',
      classes: ['inputs__box-input'],
      id: 'passwordInput',
    });
    passwordDiv.append(passwordLabel);
    passwordDiv.append(this.passwordInput);

    this.submitBtn = new Button({
      text: 'Register',
      classes: ['reg__form-submit_btn'],
    });

    // add container for reg data
    const divRegist = new BaseComponent({
      classes: ['inputs__container'],
    });
    const divaddress = new BaseComponent({
      classes: ['inputs__container'],
    });

    // create address elements
    const streetDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const streetLabel = new Label({
      forStr: 'streetInput',
      text: 'Street',
      classes: ['inputs__box-label'],
    });
    this.streetInput = new Input({
      type: 'text',
      classes: ['inputs__box-input'],
      id: 'streetInput',
    });
    streetDiv.append(streetLabel);
    streetDiv.append(this.streetInput);

    const cityDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const cityLabel = new Label({
      forStr: 'cityInput',
      text: 'City',
      classes: ['inputs__box-label'],
    });
    this.cityInput = new Input({
      type: 'text',
      classes: ['inputs__box-input'],
      id: 'cityInput',
    });
    cityDiv.append(cityLabel);
    cityDiv.append(this.cityInput);

    const postalCodeDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const postalCodeLabel = new Label({
      forStr: 'postalCodeInput',
      text: 'Postal Code',
      classes: ['inputs__box-label'],
    });
    this.postalCodeInput = new Input({
      type: 'text',
      classes: ['inputs__box-input'],
      id: 'postalCodeInput',
    });
    postalCodeDiv.append(postalCodeLabel);
    postalCodeDiv.append(this.postalCodeInput);

    const countryDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const countryLabel = new Label({
      forStr: 'country',
      text: 'Country',
      classes: ['inputs__box-label'],
    });

    const countryOptions = [
      { value: 'us', text: 'United States' },
      { value: 'au', text: 'Australia' },
    ];

    this.countryInput = new Select(countryOptions, {
      classes: ['inputs__box-select'],
      id: 'country',
    });
    countryDiv.append(countryLabel);
    countryDiv.append(this.countryInput);

    // Append the form elements to the form

    divRegist.append(firstNameDiv);
    divRegist.append(lastNameDiv);
    divRegist.append(emailDiv);
    divRegist.append(passwordDiv);

    divaddress.append(streetDiv);
    divaddress.append(cityDiv);
    divaddress.append(postalCodeDiv);
    divaddress.append(countryDiv);

    const divInputsContainer = new BaseComponent({
      classes: ['form__container'],
    });

    divInputsContainer.append(divRegist);
    divInputsContainer.append(divaddress);
    this.append(divInputsContainer);
    this.append(this.submitBtn);
  }
}
