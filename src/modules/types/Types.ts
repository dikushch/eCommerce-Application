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
