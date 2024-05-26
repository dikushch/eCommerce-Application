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
