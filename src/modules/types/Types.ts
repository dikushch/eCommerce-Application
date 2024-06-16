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
  anonymousCart?: {
    id: string;
    typeId: 'cart';
  };
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
  anonymousCartId?: string;
}

export interface CustomerLoginResponse {
  customer: Customer;
  cart?: Cart;
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
    prices: Price[];
    images: ProductImg[];
    attributes: ProductAttr[];
  };
}

interface Price {
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
  name: string | null;
  sort: SearchSort;
}

export type SearchSort =
  | 'name.en-US desc'
  | 'name.en-US asc'
  | 'price asc'
  | 'price desc'
  | null;

export interface Cart {
  id: string;
  version: number;
  lineItems: LineItem[];
  totalPrice: {
    type: 'centPrecision';
    currencyCode: 'USD';
    centAmount: number;
    fractionDigits: number;
  };
  discountOnTotalPrice?: {
    discountedAmount: {
      type: 'centPrecision';
      currencyCode: 'USD';
      centAmount: number;
      fractionDigits: number;
    };
  };
  totalLineItemQuantity?: number;
}

export interface LineItem {
  id: string;
  productId: string;
  name: {
    'en-US': string;
  };
  variant: {
    id: number;
    sku: string;
    key: string;
    prices: Price[];
    images: ProductImg[];
    attributes: ProductAttr[];
  };
  price: Price;
  quantity: number;
  totalPrice: {
    type: 'centPrecision';
    currencyCode: 'USD';
    centAmount: number;
    fractionDigits: number;
  };
}

export interface CartUpdate {
  version: number;
  actions: CartActions[];
}

export type CartActions = ChangeQuantity | RemoveLineItem | SetDiscount;

export interface ChangeQuantity {
  action: 'changeLineItemQuantity';
  lineItemId: string;
  quantity: number;
}

export interface RemoveLineItem {
  action: 'removeLineItem';
  lineItemId: string;
}

export interface SetDiscount {
  action: 'addDiscountCode';
  code: string;
}
