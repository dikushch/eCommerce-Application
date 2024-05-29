import { Customer } from '../types/Types';
import BaseComponent from './BaseComponent';
import Button from './Button';
import Input from './Input';
import Label from './Label';
import Select from './Select';

export default class ModalAddress extends BaseComponent {
  profileAddressStreet: Input;

  profileAddressCity: Input;

  profileAddressCountry: Select;

  profileAddressPostal: Input;

  saveBtn: Button;

  closeBtn: Button;

  isValidInputs: boolean = true;

  constructor(
    isEditMode: boolean,
    userInfo?: Customer,
    editAddressId?: string | null,
  ) {
    super({ classes: ['modal'] });
    console.log('ModalAddress class');

    const spanError = (textExample: string) =>
      new BaseComponent({
        tag: 'span',
        classes: ['reg_form_error-hide'],
        text: `Incorrect input, example: ${textExample}`,
      });

    const textInModal = {
      head: 'Add address',
      submitBtn: 'add',
    };
    if (isEditMode) {
      textInModal.head = 'Edit address';
      textInModal.submitBtn = 'save';
    }

    const profileModalDivHead = new BaseComponent(
      {
        classes: ['profile__info-container'],
      },

      new BaseComponent(
        {
          classes: ['profile__box'],
        },
        new BaseComponent({
          tag: 'h2',
          text: textInModal.head,
          classes: ['profile__box-h2'],
        }),
      ),
    );

    const profileModalDiv1 = new BaseComponent(
      {
        classes: ['profile__info-container'],
      },

      new BaseComponent(
        {
          classes: ['profile__box'],
        },
        new Label({
          forStr: 'profileAddressStreet',
          text: 'Street',
          classes: ['profile__box-label'],
        }),
        (this.profileAddressStreet = new Input({
          type: 'text',
          classes: ['profile__box-input'],
          id: 'profileAddressStreet',
        })),
        spanError('Tiny'),
      ),

      new BaseComponent(
        {
          classes: ['profile__box'],
        },
        new Label({
          forStr: 'profileAddressCity',
          text: 'City',
          classes: ['profile__box-label'],
        }),
        (this.profileAddressCity = new Input({
          type: 'text',
          classes: ['profile__box-input'],
          id: 'profileAddressCity',
        })),
        spanError('Georgia'),
      ),
    );

    const countryOptions = [
      { value: 'US', text: 'United States' },
      { value: 'AU', text: 'Australia' },
    ];

    const profileModalDiv2 = new BaseComponent(
      {
        classes: ['profile__info-container'],
      },

      new BaseComponent(
        {
          classes: ['profile__box'],
        },
        new Label({
          forStr: 'profileAddressCountry',
          text: 'Country',
          classes: ['profile__box-label'],
        }),
        (this.profileAddressCountry = new Select(countryOptions, {
          classes: ['profile__box-select'],
          id: 'profileAddressCountry',
        })),
      ),

      new BaseComponent(
        {
          classes: ['profile__box'],
        },
        new Label({
          forStr: 'profileAddressPostal',
          text: 'Postal code',
          classes: ['profile__box-label'],
        }),
        (this.profileAddressPostal = new Input({
          type: 'text',
          classes: ['profile__box-input'],
          id: 'profileAddressPostal',
        })),
        spanError('12345 for US and 1234 for AU'),
      ),
    );

    const profileModalDiv3 = new BaseComponent(
      {
        classes: ['profile__info-container'],
      },
      new BaseComponent(
        {
          classes: ['profile__box'],
        },
        (this.saveBtn = new Button({
          text: textInModal.submitBtn,
          classes: ['profile__box-btn', 'green'],
        })),
      ),
      new BaseComponent(
        {
          classes: ['profile__box'],
        },
        (this.closeBtn = new Button({
          text: 'close',
          classes: ['profile__box-btn', 'red'],
        })),
      ),
    );

    const profileModalContent = new BaseComponent(
      {
        classes: ['modal-content'],
      },
      profileModalDivHead,
      profileModalDiv1,
      profileModalDiv2,
      profileModalDiv3,
    );

    // event listeners

    this.profileAddressCity.addListener('input', () => {
      ModalAddress.removeIncorrectStyle(this.profileAddressCity);
    });
    this.profileAddressPostal.addListener('input', () => {
      ModalAddress.removeIncorrectStyle(this.profileAddressPostal);
    });
    this.profileAddressStreet.addListener('input', () => {
      ModalAddress.removeIncorrectStyle(this.profileAddressStreet);
    });

    this.closeBtn.addListener('click', () => {
      this.destroyModal();
    });
    this.saveBtn.addListener('click', () => {
      console.log('click save');

      this.isValidInputs = true;
      this.checkAllInputsValue();

      if (this.isValidInputs) {
        console.log('!!! send data to server');
      }
    });

    window.onclick = (event: MouseEvent) => {
      this.handleWindowClick(event);
    };

    if (isEditMode) {
      if (userInfo && editAddressId) {
        this.fillInputs(userInfo, editAddressId);
      }
    }

    this.append(profileModalContent);
  }

  handleWindowClick(event: MouseEvent): void {
    if (event.target === this.getNode()) {
      this.destroyModal();
    }
  }

  destroyModal(): void {
    this.destroy();
  }

  fillInputs(userInfo: Customer, editAddressId: string): void {
    const editAddress = userInfo.addresses.find(
      (address) => address.id === editAddressId,
    );
    if (editAddress) {
      console.log(editAddress.city);

      this.profileAddressCity.setValue(editAddress.city);
      this.profileAddressPostal.setValue(editAddress.postalCode);
      this.profileAddressStreet.setValue(editAddress.streetName);
      this.profileAddressCountry.setValue(editAddress.country);
    }
  }

  checkAllInputsValue() {
    const postalCodeRegexps: { [key: string]: RegExp } = {
      US: /^\d{5}$/,
      AU: /^\d{4}$/,
    };

    const streetRegExp = /^.+$/;
    const cityRegExp = /^[A-Za-z\s]+$/;

    const arrayValuesAndRegExp: [Input, RegExp][] = [
      [this.profileAddressStreet, streetRegExp],
      [this.profileAddressCity, cityRegExp],
      [
        this.profileAddressPostal,
        postalCodeRegexps[this.profileAddressCountry.getValue()],
      ],
    ];

    arrayValuesAndRegExp.forEach((valueAndReg) => {
      if (!ModalAddress.validateInputValue(valueAndReg[0], valueAndReg[1])) {
        this.isValidInputs = false;
      }
    });
  }

  static validateInputValue(inputValue: Input, regExp: RegExp) {
    const spanError: Element | null = inputValue.getNode().nextElementSibling;
    if (regExp.test(inputValue.getValue())) {
      inputValue.removeClass('incorrect_input');
      inputValue.addClass('correct_input');
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
}
