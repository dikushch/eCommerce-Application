import BaseComponent from './BaseComponent';
import Input from './Input';
import Button from './Button';
import Label from './Label';
import Select from './Select';

export default class RegForm extends BaseComponent<HTMLFormElement> {
  firstNameInput: Input;

  lastNameInput: Input;

  emailInput: Input;

  birthDateInput: Input;

  passwordInput: Input;

  // add billing address

  streetBillingInput: Input;

  cityBillingInput: Input;

  postalBillingCodeInput: Input;

  countryBillingInput: Select;

  // add Shipping address

  streetShippingInput: Input;

  cityShippingInput: Input;

  postalShippingCodeInput: Input;

  countryShippingInput: Select;

  // add checkbox

  checkDefaultBillingInput: Input;

  checkDefaultShippingInput: Input;

  checkIsSameAddressInput: Input;

  submitBtn: Button;

  constructor(props: { classes?: string[] }) {
    super({ tag: 'form', classes: props.classes });

    // Initialize form
    const spanError = (textExample: string) =>
      new BaseComponent({
        tag: 'span',
        classes: ['reg_form_error-hide'],
        text: `Incorrect input, example: ${textExample}`,
      });
    const h2Element = (textHead: string) =>
      new BaseComponent({
        tag: 'h2',
        classes: ['reg_form-h2'],
        text: textHead,
      });

    const h2PersonalDiv = new BaseComponent(
      {
        classes: ['inputs__box'],
      },
      h2Element('Personal Info'),
    );

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
    this.firstNameInput.setAttribute('required', '');

    firstNameDiv.append(firstNameLabel);
    firstNameDiv.append(this.firstNameInput);
    firstNameDiv.append(spanError('Bob'));

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
    this.lastNameInput.setAttribute('required', '');
    lastNameDiv.append(lastNameLabel);
    lastNameDiv.append(this.lastNameInput);
    lastNameDiv.append(spanError('Martin'));

    const birthDateDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const birthDateLabel = new Label({
      forStr: 'birthDateInput',
      text: 'Date of birth',
      classes: ['inputs__box-label'],
    });
    this.birthDateInput = new Input({
      type: 'date',
      classes: ['inputs__box-input'],
      id: 'birthDateInput',
    });
    this.birthDateInput.setAttribute('required', '');
    birthDateDiv.append(birthDateLabel);
    birthDateDiv.append(this.birthDateInput);
    birthDateDiv.append(spanError('must be at least 13 years old'));

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
    this.emailInput.setAttribute('required', '');
    emailDiv.append(emailLabel);
    emailDiv.append(this.emailInput);
    emailDiv.append(spanError('example@exam.ex'));

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
    this.passwordInput.setAttribute('required', '');
    passwordDiv.append(passwordLabel);
    passwordDiv.append(this.passwordInput);
    passwordDiv.append(
      spanError(
        'need 8 symbols and at least one symbol, digit, upper and lower letter',
      ),
    );

    this.submitBtn = new Button({
      text: 'Register',
      classes: ['reg__form-submit_btn'],
    });

    // add container for reg data
    const divRegist = new BaseComponent({
      classes: ['inputs__container'],
    });
    const divBillingAddress = new BaseComponent({
      classes: ['inputs__container'],
    });
    const divShippingAddress = new BaseComponent({
      classes: ['inputs__container'],
    });

    // create address elements
    const h2BillingDiv = new BaseComponent(
      {
        classes: ['inputs__box'],
      },
      h2Element('Billing address'),
    );

    const streetBillingDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const streetBillingLabel = new Label({
      forStr: 'streetBillingInput',
      text: 'Street',
      classes: ['inputs__box-label'],
    });
    this.streetBillingInput = new Input({
      type: 'text',
      classes: ['inputs__box-input'],
      id: 'streetBillingInput',
    });
    this.streetBillingInput.setAttribute('required', '');
    streetBillingDiv.append(streetBillingLabel);
    streetBillingDiv.append(this.streetBillingInput);
    streetBillingDiv.append(spanError('Penny Parkway'));

    const cityBillingDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const cityBillingLabel = new Label({
      forStr: 'cityBillingInput',
      text: 'City',
      classes: ['inputs__box-label'],
    });
    this.cityBillingInput = new Input({
      type: 'text',
      classes: ['inputs__box-input'],
      id: 'cityBillingInput',
    });
    this.cityBillingInput.setAttribute('required', '');
    cityBillingDiv.append(cityBillingLabel);
    cityBillingDiv.append(this.cityBillingInput);
    cityBillingDiv.append(spanError('Georgia'));

    const postalBillingCodeDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const postalBillingCodeLabel = new Label({
      forStr: 'postalBillingCodeInput',
      text: 'Postal Code',
      classes: ['inputs__box-label'],
    });
    this.postalBillingCodeInput = new Input({
      type: 'text',
      classes: ['inputs__box-input'],
      id: 'postalBillingCodeInput',
    });
    this.postalBillingCodeInput.setAttribute('required', '');
    postalBillingCodeDiv.append(postalBillingCodeLabel);
    postalBillingCodeDiv.append(this.postalBillingCodeInput);
    postalBillingCodeDiv.append(spanError('1900014'));

    const countryBillingDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const countryBillingLabel = new Label({
      forStr: 'billingCountry',
      text: 'Country',
      classes: ['inputs__box-label'],
    });

    const countryOptions = [
      { value: 'us', text: 'United States' },
      { value: 'au', text: 'Australia' },
    ];

    this.countryBillingInput = new Select(countryOptions, {
      classes: ['inputs__box-select'],
      id: 'billingCountry',
    });
    countryBillingDiv.append(countryBillingLabel);
    countryBillingDiv.append(this.countryBillingInput);

    // checkbox create
    const checkBillingDiv = new BaseComponent({
      classes: ['checkbox_container'],
    });
    const checkDefaultBillingLabel = new Label({
      forStr: 'checkDefaultBillingInput',
      text: 'Default billing address:',
      classes: ['inputs__box-label'],
    });
    this.checkDefaultBillingInput = new Input({
      type: 'checkbox',
      classes: ['inputs__box-checkbox'],
      id: 'checkDefaultBillingInput',
    });

    // add shipping address elements
    const h2ShippingDiv = new BaseComponent(
      {
        classes: ['inputs__box'],
      },
      h2Element('Shipping address'),
    );
    const streetShippingDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const streetShippingLabel = new Label({
      forStr: 'streetShippingInput',
      text: 'Street',
      classes: ['inputs__box-label'],
    });
    this.streetShippingInput = new Input({
      type: 'text',
      classes: ['inputs__box-input'],
      id: 'streetShippingInput',
    });
    this.streetShippingInput.setAttribute('required', '');
    streetShippingDiv.append(streetShippingLabel);
    streetShippingDiv.append(this.streetShippingInput);
    streetShippingDiv.append(spanError('Penny Parkway'));

    const cityShippingDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const cityShippingLabel = new Label({
      forStr: 'cityShippingInput',
      text: 'City',
      classes: ['inputs__box-label'],
    });
    this.cityShippingInput = new Input({
      type: 'text',
      classes: ['inputs__box-input'],
      id: 'cityShippingInput',
    });
    this.cityShippingInput.setAttribute('required', '');
    cityShippingDiv.append(cityShippingLabel);
    cityShippingDiv.append(this.cityShippingInput);
    cityShippingDiv.append(spanError('Georgia'));

    const postalShippingCodeDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const postalShippingCodeLabel = new Label({
      forStr: 'postalShippingCodeInput',
      text: 'Postal Code',
      classes: ['inputs__box-label'],
    });
    this.postalShippingCodeInput = new Input({
      type: 'text',
      classes: ['inputs__box-input'],
      id: 'postalShippingCodeInput',
    });
    this.postalShippingCodeInput.setAttribute('required', '');
    postalShippingCodeDiv.append(postalShippingCodeLabel);
    postalShippingCodeDiv.append(this.postalShippingCodeInput);
    postalShippingCodeDiv.append(spanError('1900014'));

    const countryShippingDiv = new BaseComponent({
      classes: ['inputs__box'],
    });
    const countryShippingLabel = new Label({
      forStr: 'shippingCountry',
      text: 'Country',
      classes: ['inputs__box-label'],
    });

    this.countryShippingInput = new Select(countryOptions, {
      classes: ['inputs__box-select'],
      id: 'shippingCountry',
    });
    countryShippingDiv.append(countryShippingLabel);
    countryShippingDiv.append(this.countryShippingInput);

    // checkbox create
    const checkShippingDiv = new BaseComponent({
      classes: ['checkbox_container'],
    });
    const checkDefaultShippingLabel = new Label({
      forStr: 'checkDefaultShippingInput',
      text: 'Default shipping address:',
      classes: ['inputs__box-label'],
    });
    this.checkDefaultShippingInput = new Input({
      type: 'checkbox',
      classes: ['inputs__box-checkbox'],
      id: 'checkDefaultShippingInput',
    });

    // if addreses is the same
    const checkIsSameAddressdDiv = new BaseComponent({
      classes: ['checkbox_container'],
    });
    const checkIsSameAddressLabel = new Label({
      forStr: 'checkIsSameAddressInput',
      text: 'Same address for billing and shipping:',
      classes: ['inputs__box-label'],
    });
    this.checkIsSameAddressInput = new Input({
      type: 'checkbox',
      classes: ['inputs__box-checkbox'],
      id: 'checkIsSameAddressInput',
    });
    checkIsSameAddressdDiv.append(checkIsSameAddressLabel);
    checkIsSameAddressdDiv.append(this.checkIsSameAddressInput);

    checkBillingDiv.append(checkDefaultBillingLabel);
    checkBillingDiv.append(this.checkDefaultBillingInput);

    checkShippingDiv.append(checkDefaultShippingLabel);
    checkShippingDiv.append(this.checkDefaultShippingInput);
    // Append the form elements to the form

    divRegist.append(h2PersonalDiv);
    divRegist.append(firstNameDiv);
    divRegist.append(lastNameDiv);
    divRegist.append(birthDateDiv);
    divRegist.append(emailDiv);
    divRegist.append(passwordDiv);
    divRegist.append(checkIsSameAddressdDiv);

    // add billing address in container
    divBillingAddress.append(h2BillingDiv);
    divBillingAddress.append(streetBillingDiv);
    divBillingAddress.append(cityBillingDiv);
    divBillingAddress.append(postalBillingCodeDiv);
    divBillingAddress.append(countryBillingDiv);
    divBillingAddress.append(checkBillingDiv);

    // add shipping address in container
    divShippingAddress.append(h2ShippingDiv);
    divShippingAddress.append(streetShippingDiv);
    divShippingAddress.append(cityShippingDiv);
    divShippingAddress.append(postalShippingCodeDiv);
    divShippingAddress.append(countryShippingDiv);
    divShippingAddress.append(checkShippingDiv);

    const divInputsContainer = new BaseComponent({
      classes: ['form__container'],
    });

    divInputsContainer.append(divRegist);
    divInputsContainer.append(divBillingAddress);
    divInputsContainer.append(divShippingAddress);
    this.append(divInputsContainer);
    this.append(this.submitBtn);
  }
}
