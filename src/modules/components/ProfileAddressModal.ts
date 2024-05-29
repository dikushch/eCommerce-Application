import BaseComponent from './BaseComponent';
import Button from './Button';
import Input from './Input';
import Label from './Label';
import Select from './Select';

export default class ModalAddress extends BaseComponent {
  profileAddressStreet: Input;

  profileAddressCity: Input;

  profileAddressSelect: Select;

  profileAddressPostal: Input;

  saveBtn: Button;

  closeBtn: Button;

  constructor() {
    super({ classes: ['modal'] });
    console.log('ModalAddress class');

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
          text: 'Address',
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
        (this.profileAddressSelect = new Select(countryOptions, {
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
          text: 'save',
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
    this.closeBtn.addListener('click', () => {
      this.destroyModal();
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
}
