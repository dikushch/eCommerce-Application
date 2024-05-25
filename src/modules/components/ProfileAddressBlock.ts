import BaseComponent from './BaseComponent';
import { Customer, Address } from '../types/Types';
import Button from './Button';

export default class ProfileAddressBlock extends BaseComponent {
  profileAddNewAddress: Button;

  // profileEditAddress: Button;

  // profileRemoveAddress: Button;

  constructor(userInfo: Customer) {
    super({ classes: ['profile__address'] });
    const h2Element = (textHead: string) =>
      new BaseComponent({
        tag: 'h2',
        classes: ['h2'],
        text: textHead,
      });
    // add in colums
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
      console.log('click add new address btn');
    });
    profileAddressesListDiv.addListener('click', (e) => {
      const ev = e.target as HTMLElement;
      if (
        ev != null &&
        ev.tagName === 'BUTTON' &&
        ev.classList.contains('green')
      ) {
        console.log('!!! Green button clicked:');
        console.log('addressid', ev.getAttribute('data-addressid'));
      }
      if (
        ev != null &&
        ev.tagName === 'BUTTON' &&
        ev.classList.contains('red')
      ) {
        console.log('!!! Red button clicked:');
        console.log('addressid', ev.getAttribute('data-addressid'));
      }
    });
    console.log(userInfo.addresses);

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
}
