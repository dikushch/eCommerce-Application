import BaseComponent from './BaseComponent';
import { Customer, Address, ChangeCustomerRequest } from '../types/Types';
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

    const addressesShippingOptions: { value: string; text: string }[] = [];

    const addressesBillingOptions: { value: string; text: string }[] = [];

    if (!userInfo.defaultShippingAddressId) {
      addressesShippingOptions.push({
        text: `No default address`,
        value: ``,
      });
    }
    if (!userInfo.defaultBillingAddressId) {
      addressesBillingOptions.push({
        text: `No default address`,
        value: ``,
      });
    }
    userInfo.addresses.forEach((element) => {
      addressesShippingOptions.push(
        ProfileDefaultAddressSelect.addAddressOption(element),
      );
      addressesBillingOptions.push(
        ProfileDefaultAddressSelect.addAddressOption(element),
      );
    });

    this.addressDefaultShippingSelect = new Select(addressesShippingOptions, {
      classes: ['inputs__box-select'],
      id: 'shippingAddresses',
    });
    if (userInfo.defaultShippingAddressId) {
      const selectSh =
        this.addressDefaultShippingSelect.getNode() as HTMLSelectElement;
      selectSh.value = userInfo.defaultShippingAddressId;
    }

    this.addressDefaultBillingSelect = new Select(addressesBillingOptions, {
      classes: ['inputs__box-select'],
      id: 'billingAddresses',
    });
    if (userInfo.defaultBillingAddressId) {
      const selectB =
        this.addressDefaultBillingSelect.getNode() as HTMLSelectElement;
      selectB.value = userInfo.defaultBillingAddressId;
    }

    // add listeners

    this.addressDefaultShippingSelect.addListener('change', () => {
      console.log('change shipping address');
      const dataAddressDefaultShipping: ChangeCustomerRequest = {
        version: userInfo.version,
        actions: [
          {
            action: 'setDefaultShippingAddress',
            addressId: this.addressDefaultShippingSelect.getValue(),
          },
        ],
      };
      console.log(dataAddressDefaultShipping);
      this.dispathUpdateEvent(userInfo.id, dataAddressDefaultShipping);
    });

    this.addressDefaultBillingSelect.addListener('change', () => {
      console.log('change billing address');
      const dataAddressDefaultBilling: ChangeCustomerRequest = {
        version: userInfo.version,
        actions: [
          {
            action: 'setDefaultBillingAddress',
            addressId: this.addressDefaultBillingSelect.getValue(),
          },
        ],
      };
      console.log(dataAddressDefaultBilling);
      this.dispathUpdateEvent(userInfo.id, dataAddressDefaultBilling);
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

  dispathUpdateEvent(id: string, data: ChangeCustomerRequest): void {
    const event = new CustomEvent('update-customer', {
      bubbles: true,
      detail: { id, data },
    });
    this.getNode().dispatchEvent(event);
  }
}
