import {
  TokenResponse,
  NewCustomerData,
  LoginData,
  CustomerLoginResponse,
  ErrResponse,
  Customer,
  ChangeCustomerRequest,
  ChangePassData,
  ProductsResponse,
  OneProduct,
  SearchProductsData,
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

export async function getAccessTokenPassFlow(
  email: string,
  pass: string,
): Promise<TokenResponse | null> {
  try {
    const response = await fetch(
      `${authUrl}/oauth/${projectKey}/customers/token?grant_type=password&username=${email}&password=${pass}`,
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

export async function updateCustomer(
  token: TokenResponse,
  id: string,
  dataToChange: ChangeCustomerRequest,
): Promise<Customer | ErrResponse> {
  try {
    const response = await fetch(`${host}/${projectKey}/customers/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToChange),
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

export async function changeCustomerPass(
  token: TokenResponse,
  data: ChangePassData,
): Promise<Customer | ErrResponse> {
  try {
    const response = await fetch(`${host}/${projectKey}/customers/password`, {
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

export async function getAllProducts(
  token: TokenResponse,
): Promise<ProductsResponse | ErrResponse> {
  try {
    const response = await fetch(`${host}/${projectKey}/product-projections`, {
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

export async function getProductById(
  token: TokenResponse,
  id: string,
): Promise<OneProduct | ErrResponse> {
  try {
    const response = await fetch(
      `${host}/${projectKey}/product-projections/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `${token.token_type} ${token.access_token}`,
        },
      },
    );

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

export async function searchProducts(
  token: TokenResponse,
  searchData: SearchProductsData,
): Promise<ProductsResponse | ErrResponse> {
  const filters = [];
  if (searchData.color !== null) {
    filters.push(`filter=variants.attributes.color:"${searchData.color}"`);
  }
  if (searchData.size !== null) {
    filters.push(`filter=variants.attributes.size:"${searchData.size}"`);
  }
  if (searchData.price !== null) {
    filters.push(
      `filter=variants.prices.value.centAmount:range (${searchData.price.from} to ${searchData.price.to})`,
    );
  }
  if (searchData.type !== null) {
    filters.push(`filter=productType.id:"${searchData.type}"`);
  }
  if (searchData.name !== null) {
    filters.push(`text.en-US="${searchData.name}"`);
  }
  try {
    const response = await fetch(
      `${host}/${projectKey}/product-projections/search?${filters.join('&')}`,
      {
        method: 'GET',
        headers: {
          Authorization: `${token.token_type} ${token.access_token}`,
        },
      },
    );

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
