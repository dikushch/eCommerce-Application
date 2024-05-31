import { Customer } from '../types/Types';
import BaseComponent from './BaseComponent';
import Button from './Button';
import Input from './Input';
import Label from './Label';

export default class PaswordModal extends BaseComponent {
  profileCurrentPassword: Input;

  profileNewPassword: Input;

  profileConfurmNewPassword: Input;

  saveBtn: Button;

  closeBtn: Button;

  isValidInputs: boolean = true;

  constructor(userInfo: Customer) {
    super({ classes: ['modal'] });

    const spanError = (textExample: string) =>
      new BaseComponent({
        tag: 'span',
        classes: ['reg_form_error-hide'],
        text: `Incorrect input, example: ${textExample}`,
      });

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
          text: 'Change password',
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
          forStr: 'profileCurrentPassword',
          text: 'current password',
          classes: ['profile__box-label'],
        }),
        (this.profileCurrentPassword = new Input({
          type: 'password',
          classes: ['profile__box-input'],
          id: 'profileCurrentPassword',
        })),
        spanError('need 8 characters and 1 digit, 1 upper and lower letter'),
      ),
    );
    const profileModalDiv2 = new BaseComponent(
      {
        classes: ['profile__info-container'],
      },

      new BaseComponent(
        {
          classes: ['profile__box'],
        },
        new Label({
          forStr: 'profileNewPassword',
          text: 'new password',
          classes: ['profile__box-label'],
        }),
        (this.profileNewPassword = new Input({
          type: 'password',
          classes: ['profile__box-input'],
          id: 'profileNewPassword',
        })),
        spanError('need 8 characters and 1 digit, 1 upper and lower letter'),
      ),
    );

    const profileModalDiv4 = new BaseComponent(
      {
        classes: ['profile__info-container'],
      },
      new BaseComponent(
        {
          classes: ['profile__box'],
        },
        (this.saveBtn = new Button({
          text: 'change',
          classes: ['profile__box-btn', 'green'],
        })),
      ),
      new BaseComponent(
        {
          classes: ['profile__box'],
        },
        (this.closeBtn = new Button({
          text: 'cancel',
          classes: ['profile__box-btn', 'red'],
        })),
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
        new Label({
          forStr: 'profileConfurmNewPassword',
          text: 'confurm new password',
          classes: ['profile__box-label'],
        }),
        (this.profileConfurmNewPassword = new Input({
          type: 'password',
          classes: ['profile__box-input'],
          id: 'profileConfurmNewPassword',
        })),
        spanError('need 8 characters and 1 digit, 1 upper and lower letter'),
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
      profileModalDiv4,
    );

    // event listeners

    this.profileCurrentPassword.addListener('input', () => {
      PaswordModal.removeIncorrectStyle(this.profileCurrentPassword);
    });
    this.profileNewPassword.addListener('input', () => {
      PaswordModal.removeIncorrectStyle(this.profileNewPassword);
    });
    this.profileConfurmNewPassword.addListener('input', () => {
      PaswordModal.removeIncorrectStyle(this.profileConfurmNewPassword);
    });

    this.closeBtn.addListener('click', () => {
      this.destroyModal();
    });

    this.saveBtn.addListener('click', () => {
      this.isValidInputs = true;
      this.checkAllInputsValue();

      if (this.isValidInputs) {
        console.log(userInfo);

        console.log('!!! send request to server');
      }
    });

    window.onclick = (event: MouseEvent) => {
      this.handleWindowClick(event);
    };

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

  checkAllInputsValue() {
    const regPasswExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    const arrayValuesAndRegExp: [Input, RegExp][] = [
      [this.profileCurrentPassword, regPasswExp],
      [this.profileNewPassword, regPasswExp],
      [this.profileConfurmNewPassword, regPasswExp],
    ];

    arrayValuesAndRegExp.forEach((valueAndReg) => {
      if (!PaswordModal.validateInputValue(valueAndReg[0], valueAndReg[1])) {
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
