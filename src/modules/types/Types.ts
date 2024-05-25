export interface RouteItem {
  path: string;
  component: HTMLElement;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token?: string;
}

export interface CustomerAddress {
  country: 'AU' | 'US';
  city: string;
  streetName: string;
  postalCode: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface NewCustomerData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth?: string;
  addresses: CustomerAddress[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface CustomerLoginResponse {
  customer: Customer;
}

export interface Customer {
  id: string;
  version: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isEmailVerified: boolean;
  createdAt: string;
  lastModifiedAt: string;
  addresses: Address[];
  defaultShippingAddressId: string;
  shippingAddressIds: string[];
  defaultBillingAddressId: string;
  billingAddressIds: string[];
  authenticationMode: string;
  stores: [];
  dateOfBirth: string;
}

export interface Address {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface ErrResponse {
  statusCode: number;
  message: string;
  errors: Error[];
}

interface Error {
  code: string;
  message: string;
  detailedErrorMessage: string;
}

export interface ChangeCustomerRequest {
  version: number;
  actions: Actions[];
}

type Actions =
  | SetEmailAction
  | SetFirstNameAction
  | SetLastNameAction
  | SetDateOfBirthAction
  | AddNewAddressAction
  | RemoveAddressAction
  | ChangeAddressAction
  | SetDefaultBillingAction
  | SetDefaultShippingAction;

export interface SetEmailAction {
  action: 'changeEmail';
  email: string;
}

export interface SetFirstNameAction {
  action: 'setFirstName';
  firstName: string;
}

export interface SetLastNameAction {
  action: 'setLastName';
  lastName: string;
}

export interface SetDateOfBirthAction {
  action: 'setDateOfBirth';
  dateOfBirth: string;
}

export interface AddNewAddressAction {
  action: 'addAddress';
  address: CustomerAddress;
}

export interface RemoveAddressAction {
  action: 'removeAddress';
  addressId: string;
}

export interface ChangeAddressAction {
  action: 'changeAddress';
  addressId: string;
  address: CustomerAddress;
}

export interface SetDefaultShippingAction {
  action: 'setDefaultShippingAddress';
  addressId: string;
}

export interface SetDefaultBillingAction {
  action: 'setDefaultBillingAddress';
  addressId: string;
}

export interface ChangePassData {
  id: string;
  version: number;
  currentPassword: string;
  newPassword: string;
}

export interface ProductsResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: OneProduct[];
}

export interface OneProduct {
  id: string;
  version: number;
  productType: {
    typeId: 'product-type';
    id: string;
  };
  name: {
    'en-US': string;
  };
  description: {
    'en-US': string;
  };
  masterVariant: {
    id: number;
    sku: string;
    key: string;
    prices: {
      id: string;
      value: {
        type: 'centPrecision';
        currencyCode: 'USD';
        centAmount: number;
        fractionDigits: number;
      };
      discounted?: {
        value: {
          type: 'centPrecision';
          currencyCode: 'USD';
          centAmount: number;
          fractionDigits: number;
        };
      };
    };
    images: ProductImg[];
    attributes: ProductAttr[];
  };
}

export interface ProductImg {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

export interface ProductAttr {
  name: string;
  value: string;
}

export interface SearchProductsData {
  color: string | null;
  size: string | null;
  price: {
    from: number;
    to: number;
  } | null;
  type: string | null;
}
