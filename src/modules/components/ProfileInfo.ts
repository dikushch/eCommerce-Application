import BaseComponent from './BaseComponent';
import Label from './Label';
import Input from './Input';
import { ChangeCustomerRequest, Customer } from '../types/Types';
import Button from './Button';

export default class ProfileInfo extends BaseComponent {
  profileFirstNameInput: Input;

  profileLastNameInput: Input;

  profileEmailInput: Input;

  profileBirthDateInput: Input;

  profileEditBtn: Button;

  profileChangePasswordBtn: Button;

  // passwordInput: Input;

  isEditMode: boolean = false;

  isValidInputs: boolean = true;

  constructor(userInfo: Customer) {
    super({ classes: ['profile__info'] });

    const spanError = (textExample: string) =>
      new BaseComponent({
        tag: 'span',
        classes: ['reg_form_error-hide'],
        text: `Incorrect input, example: ${textExample}`,
      });

    const firstNameLabel = new Label({
      forStr: 'profileFirstNameInput',
      text: 'First Name',
      classes: ['profile__box-label'],
    });
    const profileFirstNameDiv = new BaseComponent(
      { classes: ['profile__box'] },
      firstNameLabel,
      (this.profileFirstNameInput = new Input({
        type: 'text',
        classes: ['profile__box-input'],
        id: 'profileFirstNameInput',
      })),
      spanError('Bob'),
    );

    const lastNameLabel = new Label({
      forStr: 'profileLastNameInput',
      text: 'Last Name',
      classes: ['profile__box-label'],
    });
    const profileLastNameDiv = new BaseComponent(
      { classes: ['profile__box'] },
      lastNameLabel,
      (this.profileLastNameInput = new Input({
        type: 'text',
        classes: ['profile__box-input'],
        id: 'profileLastNameInput',
      })),
      spanError('Martin'),
    );

    const birthDateLabel = new Label({
      forStr: 'profileBirthDateInput',
      text: 'Date of birth',
      classes: ['profile__box-label'],
    });
    const profileBirthDateDiv = new BaseComponent(
      { classes: ['profile__box'] },
      birthDateLabel,
      (this.profileBirthDateInput = new Input({
        type: 'date',
        classes: ['profile__box-input'],
        id: 'profileBirthDateInput',
      })),
      spanError('must be at least 13 years old'),
    );

    const emailLabel = new Label({
      forStr: 'profileEmailInput',
      text: 'Email',
      classes: ['profile__box-label'],
    });
    const profileEmailDiv = new BaseComponent(
      { classes: ['profile__box'] },
      emailLabel,
      (this.profileEmailInput = new Input({
        type: 'text',
        classes: ['profile__box-input'],
        id: 'profileEmailInput',
      })),
      spanError('example@exam.ex'),
    );

    const profileEditBtnDiv = new BaseComponent(
      { classes: ['profile__box'] },
      (this.profileEditBtn = new Button({
        text: 'edit profile',
        classes: ['profile__box-btn', 'green'],
      })),
    );
    // add listeners
    this.profileEditBtn.addListener('click', () => {
      console.log('click edit btn');
      if (!this.isEditMode) {
        this.initEditMode();
      } else {
        this.isValidInputs = true;
        this.checkAllInputsValue();

        if (this.isValidInputs) {
          this.prepareDataToRequest(userInfo);
        }
      }
    });

    const profileChangePasswordBtnDiv = new BaseComponent(
      { classes: ['profile__box'] },
      (this.profileChangePasswordBtn = new Button({
        text: 'change password',
        classes: ['profile__box-btn', 'red'],
      })),
    );

    // add listeners
    this.profileChangePasswordBtn.addListener('click', () => {
      console.log('click change password btn');
      if (this.isEditMode) {
        this.cancelEditMode(userInfo);
      }
    });

    // clean error message
    this.profileFirstNameInput.addListener('input', () => {
      ProfileInfo.removeIncorrectStyle(this.profileFirstNameInput);
    });
    this.profileLastNameInput.addListener('input', () => {
      ProfileInfo.removeIncorrectStyle(this.profileLastNameInput);
    });
    this.profileBirthDateInput.addListener('input', () => {
      ProfileInfo.removeIncorrectStyle(this.profileBirthDateInput);
    });
    this.profileEmailInput.addListener('input', () => {
      ProfileInfo.removeIncorrectStyle(this.profileEmailInput);
    });

    // disable all inputs
    this.changeInputStatus(false);

    // set value
    this.profileFirstNameInput.setValue(userInfo.firstName);
    this.profileLastNameInput.setValue(userInfo.lastName);
    this.profileEmailInput.setValue(userInfo.email);
    this.profileBirthDateInput.setValue(userInfo.dateOfBirth);

    // add in colums
    const profileDiv1 = new BaseComponent(
      {
        classes: ['profile__info-container'],
      },
      profileFirstNameDiv,
      profileLastNameDiv,
    );

    const profileDiv2 = new BaseComponent(
      {
        classes: ['profile__info-container'],
      },
      profileBirthDateDiv,
      profileEmailDiv,
    );
    const profileDiv3 = new BaseComponent(
      {
        classes: ['profile__info-container'],
      },
      profileEditBtnDiv,
      profileChangePasswordBtnDiv,
    );

    this.append(profileDiv1);
    this.append(profileDiv2);
    this.append(profileDiv3);
  }

  initEditMode() {
    this.isEditMode = true;

    this.changeInputStatus(true);

    this.profileEditBtn.setTextContent('save');
    this.profileChangePasswordBtn.setTextContent('cancel');
  }

  cancelEditMode(userInfo: Customer) {
    this.isEditMode = false;

    this.cancelInputChanges(userInfo);

    this.changeInputStatus(false);

    ProfileInfo.removeIncorrectStyle(this.profileFirstNameInput);
    ProfileInfo.removeIncorrectStyle(this.profileLastNameInput);
    ProfileInfo.removeIncorrectStyle(this.profileBirthDateInput);
    ProfileInfo.removeIncorrectStyle(this.profileEmailInput);

    this.profileEditBtn.setTextContent('edit profile');
    this.profileChangePasswordBtn.setTextContent('change password');
  }

  changeInputStatus(isEnable: boolean) {
    if (isEnable) {
      this.profileFirstNameInput.enable();
      this.profileLastNameInput.enable();
      this.profileEmailInput.enable();
      this.profileBirthDateInput.enable();
    } else {
      this.profileFirstNameInput.disable();
      this.profileLastNameInput.disable();
      this.profileEmailInput.disable();
      this.profileBirthDateInput.disable();
    }
  }

  cancelInputChanges(userInfo: Customer) {
    this.profileFirstNameInput.setValue(userInfo.firstName);
    this.profileLastNameInput.setValue(userInfo.lastName);
    this.profileEmailInput.setValue(userInfo.email);
    this.profileBirthDateInput.setValue(userInfo.dateOfBirth);
  }

  checkAllInputsValue() {
    const regSingleWordExp = /^[A-Za-z]+$/;
    const regMailExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const arrayValuesAndRegExp: [Input, RegExp][] = [
      [this.profileFirstNameInput, regSingleWordExp],
      [this.profileLastNameInput, regSingleWordExp],
      [this.profileEmailInput, regMailExp],
    ];

    if (!ProfileInfo.validateInputDateValue(this.profileBirthDateInput)) {
      this.isValidInputs = false;
    }
    arrayValuesAndRegExp.forEach((valueAndReg) => {
      if (!ProfileInfo.validateInputValue(valueAndReg[0], valueAndReg[1])) {
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

  static validateInputDateValue(inputValue: Input) {
    const spanError: Element | null = inputValue.getNode().nextElementSibling;

    const minimumAge = 13;
    const birthDate = new Date(inputValue.getValue());

    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const differenceInMilliseconds =
      currentDate.getTime() - birthDate.getTime();

    // Convert milliseconds to years
    const ageInYears =
      differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    // Check if age is at least the minimum required age

    if (ageInYears >= minimumAge) {
      inputValue.removeClass('incorrect_input');
      inputValue.addClass('correct_input');

      if (spanError) {
        spanError.classList.remove('reg_form_error-show');
        spanError.classList.add('reg_form_error-hide');
      }
      return true;
    }
    // if false show error message
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

  prepareDataToRequest(userInfo: Customer) {
    const updateUserInfo: ChangeCustomerRequest = {
      version: userInfo.version,
      actions: [
        {
          action: 'setFirstName',
          firstName: this.profileFirstNameInput.getValue(),
        },
        {
          action: 'setLastName',
          lastName: this.profileLastNameInput.getValue(),
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth: this.profileBirthDateInput.getValue(),
        },
        {
          action: 'changeEmail',
          email: this.profileEmailInput.getValue(),
        },
      ],
    };

    console.log(updateUserInfo);

    this.dispathUpdateEvent(userInfo.id, updateUserInfo);
  }

  dispathUpdateEvent(id: string, data: ChangeCustomerRequest): void {
    const event = new CustomEvent('update-customer', {
      bubbles: true,
      detail: { id, data },
    });
    this.getNode().dispatchEvent(event);
  }
}
