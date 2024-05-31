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

  constructor(userInfo: Customer) {
    super({ classes: ['profile__info'] });

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
        this.prepareDataToRequest(userInfo);
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

    // disable all inputs
    this.profileFirstNameInput.disable();
    this.profileLastNameInput.disable();
    this.profileBirthDateInput.disable();
    this.profileEmailInput.disable();

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

    this.profileFirstNameInput.enable();
    this.profileLastNameInput.enable();
    this.profileEmailInput.enable();
    this.profileBirthDateInput.enable();

    this.profileEditBtn.setTextContent('save');
    this.profileChangePasswordBtn.setTextContent('cancel');
  }

  cancelEditMode(userInfo: Customer) {
    this.isEditMode = false;

    this.cancelInputChanges(userInfo);

    this.profileFirstNameInput.disable();
    this.profileLastNameInput.disable();
    this.profileEmailInput.disable();
    this.profileBirthDateInput.disable();

    this.profileEditBtn.setTextContent('edit profile');
    this.profileChangePasswordBtn.setTextContent('change password');
  }

  cancelInputChanges(userInfo: Customer) {
    this.profileFirstNameInput.setValue(userInfo.firstName);
    this.profileLastNameInput.setValue(userInfo.lastName);
    this.profileEmailInput.setValue(userInfo.email);
    this.profileBirthDateInput.setValue(userInfo.dateOfBirth);
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
