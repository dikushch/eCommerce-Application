import {
  TokenResponse,
  NewCustomerData,
  LoginData,
  CustomerLoginResponse,
  ErrResponse,
  Customer,
} from '../types/Types';

const authUrl = 'https://auth.australia-southeast1.gcp.commercetools.com';
const host = 'https://api.australia-southeast1.gcp.commercetools.com';
const projectKey = 'summer-shop-2';

export async function getAccessToken(): Promise<TokenResponse | null> {
  try {
    const response = await fetch(
      `${authUrl}/oauth/token?grant_type=client_credentials`,
      {
        method: 'POST',
        headers: {
          Authorization:
            'Basic a294UzBEb29GbEtrWmVBSGhVUDZQOW5UOjRXZkkyNF9ram1Lcm1qNDRweGxNd2pZN1F6YURCamtw',
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Error');
    }

    const result = await response.json();
    return result;
  } catch (e) {
    return null;
  }
}

export async function createCustomer(
  token: TokenResponse,
  data: NewCustomerData,
): Promise<CustomerLoginResponse | ErrResponse> {
  try {
    const response = await fetch(`${host}/${projectKey}/customers`, {
      method: 'POST',
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message, { cause: res });
    }

    const result = await response.json();
    return result;
  } catch (e) {
    return (e as Error).cause as ErrResponse;
  }
}

export async function loginCustomer(
  token: TokenResponse,
  data: LoginData,
): Promise<CustomerLoginResponse | ErrResponse> {
  try {
    const response = await fetch(`${host}/${projectKey}/login`, {
      method: 'POST',
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message, { cause: res });
    }

    const result = await response.json();
    return result;
  } catch (e) {
    return (e as Error).cause as ErrResponse;
  }
}

export async function getCustomerById(
  token: TokenResponse,
  id: string,
): Promise<Customer | ErrResponse> {
  try {
    const response = await fetch(`${host}/${projectKey}/customers/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    });

    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message, { cause: res });
    }

    const result = await response.json();
    return result;
  } catch (e) {
    return (e as Error).cause as ErrResponse;
  }
}
