import BaseComponent from './BaseComponent';
import { Customer, Address } from '../types/Types';
import Button from './Button';

export default class ProfileDefaultAddressSelect extends BaseComponent {
  profileAddNewAddress: Button;

  constructor(userInfo: Customer) {
    super({ classes: ['profile__default_address'] });
    const h2Element = (textHead: string) =>
      new BaseComponent({
        tag: 'h2',
        classes: ['h2'],
        text: textHead,
      });
    // add in colums
    const profileDefAddressDiv1 = new BaseComponent(
      {
        classes: ['profile__box'],
      },
      h2Element('Default shipping address:'),
      (this.profileAddNewAddress = new Button({
        text: 'delete1',
        classes: ['profile__box-btn', 'green'],
      })),
    );

    const profileDefAddressDiv2 = new BaseComponent(
      {
        classes: ['profile__box'],
      },
      h2Element('Default billing address:'),
      (this.profileAddNewAddress = new Button({
        text: 'delete2 ',
        classes: ['profile__box-btn', 'green'],
      })),
    );

    console.log(userInfo.addresses);

    this.append(profileDefAddressDiv1);
    this.append(profileDefAddressDiv2);
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
