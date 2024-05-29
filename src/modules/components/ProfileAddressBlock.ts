import BaseComponent from './BaseComponent';
import { Customer, Address, ChangeCustomerRequest } from '../types/Types';
import Button from './Button';
import ProfileAddressModal from './ProfileAddressModal';

export default class ProfileAddressBlock extends BaseComponent {
  profileAddNewAddress: Button;

  constructor(userInfo: Customer) {
    super({ classes: ['profile__address'] });
    const h2Element = (textHead: string) =>
      new BaseComponent({
        tag: 'h2',
        classes: ['h2'],
        text: textHead,
      });
    const profileAddressDiv1 = new BaseComponent(
      {
        classes: ['profile__info-container'],
      },
      h2Element('Addresses'),
      (this.profileAddNewAddress = new Button({
        text: 'add address',
        classes: ['profile__box-btn', 'green'],
      })),
    );

    const profileAddressesListDiv = new BaseComponent({
      classes: ['address__list'],
    });
    userInfo.addresses.forEach((element) => {
      profileAddressesListDiv.appendChildren(
        ProfileAddressBlock.addAddressDiv(element),
      );
    });

    // add listeners
    this.profileAddNewAddress.addListener('click', () => {
      const modalAddress = new ProfileAddressModal(false, userInfo);
      this.append(modalAddress);
    });
    profileAddressesListDiv.addListener('click', (e) => {
      const ev = e.target as HTMLElement;
      if (
        ev != null &&
        ev.tagName === 'BUTTON' &&
        ev.classList.contains('green')
      ) {
        const modalAddress = new ProfileAddressModal(
          true,
          userInfo,
          ev.getAttribute('data-addressid'),
        );
        this.append(modalAddress);
      }
      if (
        ev != null &&
        ev.getAttribute('data-addressid') !== null &&
        ev.tagName === 'BUTTON' &&
        ev.classList.contains('red')
      ) {
        const addressValue = ev.getAttribute('data-addressid');

        if (addressValue !== null) {
          const dataAddressDefaultBilling: ChangeCustomerRequest = {
            version: userInfo.version,
            actions: [
              {
                action: 'removeAddress',
                addressId: addressValue,
              },
            ],
          };
          this.dispathUpdateEvent(userInfo.id, dataAddressDefaultBilling);
        }
      }
    });

    this.append(profileAddressDiv1);
    this.append(profileAddressesListDiv);
  }

  static addAddressDiv(address: Address): BaseComponent[] {
    const divElement = new BaseComponent({
      classes: ['address__list-div'],
    });

    const spanElement = new BaseComponent({
      tag: 'span',
      text: `${address.country}, ${address.city}, ${address.streetName}, ${address.postalCode}`,
      classes: ['address__list-span'],
    });
    const editBtn = new Button({
      text: 'edit',
      classes: ['address__list-btn', 'green'],
    });
    editBtn.setAttribute('data-addressId', address.id);

    const removeBtn = new Button({
      text: 'remove',
      classes: ['address__list-btn', 'red'],
    });
    removeBtn.setAttribute('data-addressId', address.id);

    const btnsDivElement = new BaseComponent(
      {
        classes: ['address__list-div'],
      },
      editBtn,
      removeBtn,
    );

    divElement.append(spanElement);
    divElement.append(btnsDivElement);

    return [divElement];
  }

  dispathUpdateEvent(id: string, data: ChangeCustomerRequest): void {
    const event = new CustomEvent('update-customer', {
      bubbles: true,
      detail: { id, data },
    });
    this.getNode().dispatchEvent(event);
  }
}
