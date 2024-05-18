import BaseComponent from '../components/BaseComponent';
import Button from '../components/Button';
import Input from '../components/Input';
import RegForm from '../components/RegForm';
import Select from '../components/Select';

export default class RegistrationPage extends BaseComponent {
  regForm: RegForm;

  firstNameInput: Input;

  lastNameInput: Input;

  emailInput: Input;

  passwordInput: Input;

  checkIsSameAddressInput: Input;

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

  submitBtn: Button;

  isValidInputs: boolean = true;

  isSameAddresses: boolean = false;

  constructor() {
    super({
      tag: 'section',
      classes: ['reg', 'container'],
    });

    // personal information
    this.regForm = new RegForm({ classes: ['reg__form'] });
    this.firstNameInput = this.regForm.firstNameInput;
    this.lastNameInput = this.regForm.lastNameInput;
    this.emailInput = this.regForm.emailInput;
    this.passwordInput = this.regForm.passwordInput;

    // billing address
    this.streetBillingInput = this.regForm.streetBillingInput;
    this.cityBillingInput = this.regForm.cityBillingInput;
    this.postalBillingCodeInput = this.regForm.postalBillingCodeInput;
    this.countryBillingInput = this.regForm.countryBillingInput;

    // shipping address
    this.streetShippingInput = this.regForm.streetShippingInput;
    this.cityShippingInput = this.regForm.cityShippingInput;
    this.postalShippingCodeInput = this.regForm.postalShippingCodeInput;
    this.countryShippingInput = this.regForm.countryShippingInput;

    // checkbox
    this.checkIsSameAddressInput = this.regForm.checkIsSameAddressInput;
    this.checkDefaultBillingInput = this.regForm.checkDefaultBillingInput;
    this.checkDefaultShippingInput = this.regForm.checkDefaultShippingInput;

    this.submitBtn = this.regForm.submitBtn;

    this.append(this.regForm);
    this.checkIsSameAddressInput.addListener('change', () => {
      const a = this.checkIsSameAddressInput.getNode() as HTMLInputElement;

      if (a.checked) {
        console.log('checked');
        this.isSameAddresses = true;
        this.disableAllShippingInputs();
        this.copyAllFromBillToShipp();
      } else {
        console.log('not checked');
        this.isSameAddresses = false;
        this.enableAllShippingInputs();
      }
    });

    // event listeners for all inputs
    this.firstNameInput.addListener('input', () => {
      RegistrationPage.removeIncorrectStyle(this.firstNameInput);
    });
    this.lastNameInput.addListener('input', () => {
      RegistrationPage.removeIncorrectStyle(this.lastNameInput);
    });
    this.emailInput.addListener('input', () => {
      RegistrationPage.removeIncorrectStyle(this.emailInput);
    });
    this.passwordInput.addListener('input', () => {
      RegistrationPage.removeIncorrectStyle(this.passwordInput);
    });

    // billing address
    this.streetBillingInput.addListener('input', () => {
      console.log('streetBillingInput input');

      RegistrationPage.removeIncorrectStyle(this.streetBillingInput);
      if (this.isSameAddresses) {
        RegistrationPage.removeIncorrectStyle(this.streetShippingInput);
        RegistrationPage.copyOneFromBillToShipp(
          this.streetBillingInput,
          this.streetShippingInput,
        );
      }
    });
    this.cityBillingInput.addListener('input', () => {
      RegistrationPage.removeIncorrectStyle(this.cityBillingInput);
      if (this.isSameAddresses) {
        RegistrationPage.removeIncorrectStyle(this.cityShippingInput);
        RegistrationPage.copyOneFromBillToShipp(
          this.cityBillingInput,
          this.cityShippingInput,
        );
      }
    });
    this.postalBillingCodeInput.addListener('input', () => {
      RegistrationPage.removeIncorrectStyle(this.postalBillingCodeInput);
      if (this.isSameAddresses) {
        RegistrationPage.removeIncorrectStyle(this.postalShippingCodeInput);
        RegistrationPage.copyOneFromBillToShipp(
          this.postalBillingCodeInput,
          this.postalShippingCodeInput,
        );
      }
    });
    this.countryBillingInput.addListener('input', () => {
      if (this.isSameAddresses) {
        RegistrationPage.copyOneFromBillToShipp(
          this.countryBillingInput,
          this.countryShippingInput,
        );
      }
    });

    // shipping address
    this.streetShippingInput.addListener('input', () => {
      RegistrationPage.removeIncorrectStyle(this.streetShippingInput);
    });
    this.cityShippingInput.addListener('input', () => {
      RegistrationPage.removeIncorrectStyle(this.cityShippingInput);
    });
    this.postalShippingCodeInput.addListener('input', () => {
      RegistrationPage.removeIncorrectStyle(this.postalShippingCodeInput);
    });

    this.regForm.addListener('submit', (e) => {
      e.preventDefault();
      this.isValidInputs = true;
      console.log('click submit');
      this.checkAllInputsValue();

      if (this.isValidInputs) {
        console.log('!!! Init registration APP  !!!');
      }
    });
  }

  static removeIncorrectStyle(node: Input) {
    if (
      node
        .getNode()
        .nextElementSibling?.classList.contains('reg_form_error-show')
    ) {
      node.removeClass('incorrect_input');

      node.getNode().nextElementSibling?.classList.add('reg_form_error-hide');

      node
        .getNode()
        .nextElementSibling?.classList.remove('reg_form_error-show');
    }
  }

  checkAllInputsValue() {
    console.log(' checkAllInputsValue ');

    const regSingleWordExp = /^[A-Za-z]+$/;
    const regMultiWordExp = /^[A-Za-z ]+$/;
    const regPostalCodeExp = /^[A-Za-z0-9 ]+$/;
    const regMailExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regPasswExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_+=[{\]}\\|:;"'<>,.?/-])[A-Za-z\d~!@#$%^&*()_+=[{\]}\\|:;"'<>,.?/-]{8,}$/;
    const arrayValuesAndRegExp: [Input, RegExp][] = [
      [this.firstNameInput, regSingleWordExp],
      [this.lastNameInput, regSingleWordExp],
      [this.emailInput, regMailExp],
      [this.passwordInput, regPasswExp],
      // billing address
      [this.streetBillingInput, regMultiWordExp],
      [this.cityBillingInput, regMultiWordExp],
      [this.postalBillingCodeInput, regPostalCodeExp],
      // shipping address
      [this.streetShippingInput, regMultiWordExp],
      [this.cityShippingInput, regMultiWordExp],
      [this.postalShippingCodeInput, regPostalCodeExp],
    ];
    console.log(arrayValuesAndRegExp);
    arrayValuesAndRegExp.forEach((valueAndReg) => {
      if (
        !RegistrationPage.validateInputValue(valueAndReg[0], valueAndReg[1])
      ) {
        this.isValidInputs = false;
      }
    });
  }

  static validateInputValue(inputValue: Input, regExp: RegExp) {
    console.log('check input value', inputValue.getValue());
    const spanError: Element | null = inputValue.getNode().nextElementSibling;
    if (regExp.test(inputValue.getValue())) {
      inputValue.removeClass('incorrect_input');
      inputValue.addClass('correct_input');
      console.log();

      if (spanError) {
        spanError.classList.remove('reg_form_error-show');
        spanError.classList.add('reg_form_error-hide');
      }
      return true;
    }
    inputValue.removeClass('correct_input');
    inputValue.addClass('incorrect_input');

    if (spanError) {
      spanError.classList.remove('reg_form_error-hide');
      spanError.classList.add('reg_form_error-show');
    }
    return false;
  }

  disableAllShippingInputs() {
    console.log('disableAllShippingInputs');

    this.streetShippingInput.disable();
    this.cityShippingInput.disable();
    this.postalShippingCodeInput.disable();
    this.countryShippingInput.disable();
  }

  enableAllShippingInputs() {
    console.log('enableAllShippingInputs');

    this.streetShippingInput.enable();
    this.cityShippingInput.enable();
    this.postalShippingCodeInput.enable();
    this.countryShippingInput.enable();
  }

  copyAllFromBillToShipp() {
    // copy all from billing to Shipping address

    this.streetShippingInput.setValue(this.streetBillingInput.getValue());
    this.cityShippingInput.setValue(this.cityBillingInput.getValue());
    this.postalShippingCodeInput.setValue(
      this.postalBillingCodeInput.getValue(),
    );
    this.countryShippingInput.setValue(this.countryBillingInput.getValue());
  }

  static copyOneFromBillToShipp(
    fromInput: Input | Select,
    toInput: Input | Select,
  ) {
    // copy one from billing to Shipping address
    toInput.setValue(fromInput.getValue());
    console.log('get value from:', fromInput.getValue());
  }
}
