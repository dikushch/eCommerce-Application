import BaseComponent from './BaseComponent';
import { Customer, Address } from '../types/Types';
import Select from './Select';

export default class ProfileDefaultAddressSelect extends BaseComponent {
  addressDefaultBillingSelect: Select;

  addressDefaultShippingSelect: Select;

  constructor(userInfo: Customer) {
    super({ classes: ['profile__default_address', 'profile__info-container'] });
    const spanElement = (textHead: string) =>
      new BaseComponent({
        tag: 'span',
        classes: ['h3'],
        text: textHead,
      });

    const addressesOptions: { value: string; text: string }[] = [];

    userInfo.addresses.forEach((element) => {
      addressesOptions.push(
        ProfileDefaultAddressSelect.addAddressOption(element),
      );
    });

    this.addressDefaultShippingSelect = new Select(addressesOptions, {
      classes: ['inputs__box-select'],
      id: 'shippingAddresses',
    });

    this.addressDefaultBillingSelect = new Select(addressesOptions, {
      classes: ['inputs__box-select'],
      id: 'billingAddresses',
    });

    const profileDefAddressDiv1 = new BaseComponent(
      {
        classes: ['profile__box'],
      },
      spanElement('Default shipping address:'),
      this.addressDefaultShippingSelect,
    );

    const profileDefAddressDiv2 = new BaseComponent(
      {
        classes: ['profile__box'],
      },
      spanElement('Default billing address:'),
      this.addressDefaultBillingSelect,
    );

    console.log('userInfo', userInfo);

    this.append(profileDefAddressDiv1);
    this.append(profileDefAddressDiv2);
  }

  static addAddressOption(address: Address): { value: string; text: string } {
    const optionElement = {
      text: `${address.country}, ${address.city}, ${address.streetName}, ${address.postalCode}`,
      value: `${address.id}`,
    };

    return optionElement;
  }
}
