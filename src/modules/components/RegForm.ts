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

  // ???
  countryInput: Select;

  submitBtn: Button;

  constructor(props: { classes?: string[] }) {
    super({ tag: 'form', classes: props.classes });

    // Initialize form

    const firstNameDiv = new BaseComponent({
      classes: ['div-vert'],
    });
    const firstNameLabel = new Label({
      forStr: 'firstNameInput',
      text: 'First Name',
      classes: ['label'],
    });
    this.firstNameInput = new Input({
      type: 'text',
      classes: ['input'],
      id: 'firstNameInput',
    });
    firstNameDiv.append(firstNameLabel);
    firstNameDiv.append(this.firstNameInput);

    const lastNameDiv = new BaseComponent({
      classes: ['div-vert'],
    });
    const lastNameLabel = new Label({
      forStr: 'lastNameInput',
      text: 'Last Name',
      classes: ['label'],
    });
    this.lastNameInput = new Input({
      type: 'text',
      classes: ['input'],
      id: 'lastNameInput',
    });
    lastNameDiv.append(lastNameLabel);
    lastNameDiv.append(this.lastNameInput);

    const emailDiv = new BaseComponent({
      classes: ['div-vert'],
    });
    const emailLabel = new Label({
      forStr: 'emailInput',
      text: 'Email',
      classes: ['label'],
    });
    this.emailInput = new Input({
      type: 'Email',
      classes: ['input'],
      id: 'emailInput',
    });
    emailDiv.append(emailLabel);
    emailDiv.append(this.emailInput);

    const passwordDiv = new BaseComponent({
      classes: ['div-vert'],
    });
    const passwordLabel = new Label({
      forStr: 'passwordInput',
      text: 'Password',
      classes: ['label'],
    });
    this.passwordInput = new Input({
      type: 'password',
      classes: ['input'],
      id: 'passwordInput',
    });
    passwordDiv.append(passwordLabel);
    passwordDiv.append(this.passwordInput);

    this.submitBtn = new Button({
      text: 'Register',
      classes: ['submit-btn'],
    });

    // add container for reg data
    const divRegist = new BaseComponent({
      classes: ['div-vert'],
    });
    const divaddress = new BaseComponent({
      classes: ['div-vert'],
    });

    // create address elements
    const streetDiv = new BaseComponent({
      classes: ['div-vert'],
    });
    const streetLabel = new Label({
      forStr: 'streetInput',
      text: 'Street',
      classes: ['label'],
    });
    this.streetInput = new Input({
      type: 'text',
      classes: ['input'],
      id: 'streetInput',
    });
    streetDiv.append(streetLabel);
    streetDiv.append(this.streetInput);

    const cityDiv = new BaseComponent({
      classes: ['div-vert'],
    });
    const cityLabel = new Label({
      forStr: 'cityInput',
      text: 'City',
      classes: ['label'],
    });
    this.cityInput = new Input({
      type: 'text',
      classes: ['input'],
      id: 'cityInput',
    });
    cityDiv.append(cityLabel);
    cityDiv.append(this.cityInput);

    const postalCodeDiv = new BaseComponent({
      classes: ['div-vert'],
    });
    const postalCodeLabel = new Label({
      forStr: 'postalCodeInput',
      text: 'Postal Code',
      classes: ['label'],
    });
    this.postalCodeInput = new Input({
      type: 'text',
      classes: ['input'],
      id: 'postalCodeInput',
    });
    postalCodeDiv.append(postalCodeLabel);
    postalCodeDiv.append(this.postalCodeInput);

    const countryDiv = new BaseComponent({
      classes: ['div-vert'],
    });
    const countryLabel = new Label({
      forStr: 'country',
      text: 'Country',
      classes: ['label'],
    });

    const countryOptions = [
      { value: 'us', text: 'United States' },
      { value: 'au', text: 'Australia' },
    ];

    // Create an instance of the Selector with the options
    /* const countrySelector = new Select(countryOptions, 'Select Country', {
      classes: ['county-selrector'],
    }); */
    this.countryInput = new Select(countryOptions, {
      classes: ['country-selector'],
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
      classes: ['div-hor'],
    });

    divInputsContainer.append(divRegist);
    divInputsContainer.append(divaddress);
    this.append(divInputsContainer);
    this.append(this.submitBtn);
  }
}