import {
  addToCart,
  changeCustomerPass,
  createCart,
  createCustomer,
  getAccessToken,
  getCartByCustomerId,
  getCartById,
  getCustomerById,
  getProductById,
  getProductByKey,
  loginCustomer,
  searchProducts,
  updateCart,
  updateCustomer,
} from './modules/api/Api';
import ErrMsg from './modules/components/ErrMsg';
import Header from './modules/components/Header';
import OkMsg from './modules/components/OkMsg';
import Preloader from './modules/components/Preloader';
import AboutPage from './modules/pages/AboutPage';
import CartPage from './modules/pages/CartPage';
import CatalogPage from './modules/pages/CatalogPage';
import LoginPage from './modules/pages/LoginPage';
import MainPage from './modules/pages/MainPage';
import NotFoundPage from './modules/pages/NotFoundPage';
import ProductPage from './modules/pages/ProductPage';
import ProfilePage from './modules/pages/ProfilePage';
import RegistrationPage from './modules/pages/RegPage';
import Router from './modules/router/Router';
import { LineItem, RouteItem, TokenResponse } from './modules/types/Types';
import './styles.scss';

class App {
  element: HTMLElement = document.body;

  router: Router;

  header: Header;

  main: MainPage;

  login: LoginPage;

  register: RegistrationPage;

  notFoundPage: NotFoundPage;

  isLogin: boolean = false;

  authToken: string | null = null;

  customerId: string | null = null;

  catalog: CatalogPage;

  profile: ProfilePage | null = null;

  product: ProductPage | null = null;

  cartId: string | null = null;

  cart: CartPage;

  about: AboutPage;

  constructor() {
    App.checkToken();
    this.isLogin = this.checkStorage();
    this.header = new Header(this.isLogin);
    this.element.append(this.header.getNode());
    this.notFoundPage = new NotFoundPage();
    this.main = new MainPage();
    this.login = new LoginPage();
    this.register = new RegistrationPage();
    this.catalog = new CatalogPage();
    this.about = new AboutPage();
    this.cart = new CartPage();
    const routes: RouteItem[] = [
      { path: '/', component: this.main.getNode() },
      { path: '/login', component: this.login.getNode() },
      { path: '/register', component: this.register.getNode() },
      { path: '/catalog', component: this.catalog.getNode() },
      { path: '/about', component: this.about.getNode() },
      { path: '/cart', component: this.cart.getNode() },
      { path: '/404', component: this.notFoundPage.getNode() },
    ];
    this.router = new Router(this.isLogin, routes);
    this.setMenuItemActive(window.location.pathname);
    if (this.isLogin) {
      this.loginCustomer();
    }
    this.checkProductPath();
  }

  async checkProductPath() {
    const pathArr = window.location.pathname.split('/');
    if (pathArr[1] === 'catalog' && pathArr.length === 4) {
      console.log(pathArr);
      const type = pathArr[2];
      if (this.catalog.typesIds.has(type)) {
        const key = pathArr[3];
        const token = await App.checkToken();
        const res = await getProductByKey(token, key);
        if ('id' in res) {
          const imgs = res.masterVariant.images.map((img) => img.url);
          this.product = new ProductPage(
            res.id,
            res.name['en-US'],
            res.description['en-US'],
            res.masterVariant.prices[0].value.centAmount,
            res.masterVariant.prices[0].discounted?.value.centAmount,
            imgs,
          );
          this.checkRoute(`/catalog/${type}/${key}`, this.product.getNode());
          this.router.changeRoute(`/catalog/${type}/${key}`);
        }
      }
    }
  }

  async getProducts(): Promise<void> {
    const token = await App.checkToken();
    const data = await searchProducts(token, this.catalog.queryData);
    let cart = null;
    if (this.cartId) {
      cart = await getCartById(token, this.cartId);
    }
    if ('limit' in data) {
      this.catalog.createProductsList(data);
      if (data.total > data.limit) {
        const pages = Math.ceil(data.total / data.limit);
        const currentPage = data.offset / data.limit;
        this.catalog.createPagination(pages, currentPage);
      }
      if (cart && 'id' in cart) {
        this.catalog.catalogList?.checkIfProductInCart(cart.lineItems);
        if (
          this.product &&
          cart.lineItems.find((e) => e.productId === this.product?.id)
        ) {
          this.product.showRemoveBtn();
        }
      }
    }
  }

  async loginCustomer() {
    const token = JSON.parse(this.authToken as string);
    const userInfo = await getCustomerById(token, this.customerId as string);
    if ('id' in userInfo) {
      this.profile = new ProfilePage(userInfo);
      this.router.routes.push({
        path: '/profile',
        component: this.profile.getNode(),
      });
      if (window.location.pathname === '/profile') {
        this.router.changeRoute('/profile');
      }

      await this.checkCart(token, userInfo.id);
      await this.getProducts();
    }
  }

  async checkCart(token: TokenResponse, id: string) {
    const res = await getCartByCustomerId(token, id);
    if ('id' in res) {
      this.cartId = res.id;
      if (res.totalLineItemQuantity) {
        this.header.userMenu.cart.setTextContent(
          `cart(${res.totalLineItemQuantity})`,
        );
      }
      this.cart = new CartPage(res);
      this.checkRoute('/cart', this.cart.getNode());
      if (window.location.pathname === '/cart') {
        this.router.changeRoute('/cart');
      }
    }
  }

  static saveToken(token: string): void {
    localStorage.setItem('ct_token', token);
  }

  static saveCustomerId(id: string): void {
    localStorage.setItem('ct_id', id);
  }

  static getToken(): string | null {
    return localStorage.getItem('ct_token');
  }

  static getCustomerId(): string | null {
    return localStorage.getItem('ct_id');
  }

  static clearStorage(): void {
    localStorage.clear();
  }

  static async checkToken(): Promise<TokenResponse> {
    const storageToken = App.getToken();
    let token;
    if (storageToken) {
      token = JSON.parse(storageToken);
    } else {
      token = await getAccessToken();
      App.saveToken(JSON.stringify(token));
    }
    return token;
  }

  checkStorage(): boolean {
    this.authToken = App.getToken();
    this.customerId = App.getCustomerId();
    if (this.authToken && this.customerId) {
      return true;
    }

    return false;
  }

  setMenuItemActive(name: string): void {
    let linkName;
    if (name === '/') {
      linkName = 'main';
    } else {
      linkName = name.slice(1);
    }
    const link = this.header.findLink(linkName);
    if (link) {
      this.header.setActiveLink(link);
    }
  }

  changePageHandler(e: CustomEvent) {
    const path = (e as CustomEvent).detail;
    this.setMenuItemActive(path);
    this.router.changeRoute(path);
  }

  async loginHandler(e: CustomEvent) {
    const token = await App.checkToken();
    if (token) {
      const preload = new Preloader();
      this.element.append(preload.getNode());
      const data = (e as CustomEvent).detail;
      if (this.cartId) {
        data.anonymousCart = {
          id: this.cartId,
          typeId: 'cart',
        };
      }
      const res = await loginCustomer(token, data);
      preload.destroy();
      if ('customer' in res) {
        App.saveCustomerId(res.customer.id);
        this.router.setLoginState(true);
        this.header.userMenu.changeLinks();
        this.router.changeRoute('/');
        this.setMenuItemActive('/');
        this.element.append(new OkMsg('successful login').getNode());
        this.profile = new ProfilePage(res.customer);
        this.updateProfileRout();
        if ('cart' in res) {
          this.cartId = res.cart?.id as string;
          this.cart = new CartPage(res.cart);
          this.checkRoute('/cart', this.cart.getNode());
          let cartTextHeader;
          if (res.cart?.totalLineItemQuantity) {
            cartTextHeader = `cart(${res.cart?.totalLineItemQuantity})`;
          } else {
            cartTextHeader = 'cart';
          }
          this.header.userMenu.cart.setTextContent(cartTextHeader);
        }
      } else {
        this.element.append(new ErrMsg(res.message).getNode());
      }
    }
  }

  async regCustomerHandler(e: CustomEvent) {
    const token = await App.checkToken();
    if (token) {
      const preload = new Preloader();
      this.element.append(preload.getNode());
      const data = (e as CustomEvent).detail;
      if (this.cartId) {
        data.anonymousCartId = this.cartId;
      }
      const res = await createCustomer(token, data);
      preload.destroy();
      if ('customer' in res) {
        App.saveCustomerId(res.customer.id);
        this.router.setLoginState(true);
        this.header.userMenu.changeLinks();
        this.router.changeRoute('/');
        this.setMenuItemActive('/');
        this.element.append(new OkMsg('successful registration').getNode());
        this.profile = new ProfilePage(res.customer);
        this.updateProfileRout();
      } else {
        this.element.append(new ErrMsg(res.message).getNode());
      }
    }
  }

  logoutHandler() {
    App.clearStorage();
    this.cart = new CartPage();
    this.checkRoute('/cart', this.cart.getNode());
    this.header.userMenu.cart.setTextContent(`cart`);
    this.cartId = null;
    this.getProducts();
    this.authToken = null;
    this.customerId = null;
    this.isLogin = false;
    this.header.userMenu.changeLinks();
    this.router.setLoginState(this.isLogin);
    this.router.changeRoute('/');
    this.setMenuItemActive('/');
  }

  updateProfileRout(): void {
    const profileRoute = this.router.routes.find((r) => r.path === '/profile');
    if (profileRoute) {
      profileRoute.component = (this.profile as ProfilePage).getNode();
    } else {
      this.router.routes.push({
        path: '/profile',
        component: (this.profile as ProfilePage).getNode(),
      });
    }
  }

  checkRoute(path: string, node: HTMLElement): void {
    const route = this.router.routes.find((r) => r.path === path);
    if (route) {
      route.component = node;
    } else {
      this.router.routes.push({
        path,
        component: node,
      });
    }
  }

  async updateCustomerHandler(e: CustomEvent) {
    const token = await App.checkToken();
    if (token) {
      const preload = new Preloader();
      this.element.append(preload.getNode());
      const { id, data } = e.detail;
      const res = await updateCustomer(token, id, data);
      preload.destroy();
      if ('id' in res) {
        this.profile = new ProfilePage(res);
        this.updateProfileRout();
        this.router.changeRoute('/profile');
        this.element.append(
          new OkMsg('user data has been successfully updated').getNode(),
        );
      } else {
        this.element.append(new ErrMsg(res.message).getNode());
      }
    }
  }

  async changePassHandler(e: CustomEvent) {
    const token = await App.checkToken();
    if (token) {
      const preload = new Preloader();
      this.element.append(preload.getNode());
      const res = await changeCustomerPass(token, e.detail);
      preload.destroy();
      if ('id' in res) {
        this.profile = new ProfilePage(res);
        this.updateProfileRout();
        this.router.changeRoute('/profile');
        this.element.append(
          new OkMsg('user password successfully changed').getNode(),
        );
      } else {
        this.element.append(new ErrMsg(res.message).getNode());
      }
    }
  }

  async updateCatalogHandler(e: CustomEvent) {
    const token = await App.checkToken();
    if (token) {
      const preload = new Preloader();
      this.element.append(preload.getNode());
      const { searchParams, page } = e.detail;
      const res = await searchProducts(token, searchParams, page);
      let cart = null;
      if (this.cartId) {
        cart = await getCartById(token, this.cartId);
      }
      preload.destroy();
      if ('limit' in res) {
        this.catalog.createProductsList(res);
        if (res.total > res.limit) {
          const pages = Math.ceil(res.total / res.limit);
          const currentPage = res.offset / res.limit;
          this.catalog.createPagination(pages, currentPage);
        }
        if (cart && 'id' in cart) {
          this.catalog.catalogList?.checkIfProductInCart(cart.lineItems);
        }
      } else {
        this.element.append(new ErrMsg(res.message).getNode());
      }
    }
  }

  async openProductHandler(e: CustomEvent) {
    const token = await App.checkToken();
    if (token) {
      const preload = new Preloader();
      this.element.append(preload.getNode());
      const res = await getProductById(token, e.detail);
      let cart = null;
      if (this.cartId) {
        cart = await getCartById(token, this.cartId);
      }
      preload.destroy();
      if ('id' in res) {
        const imgs = res.masterVariant.images.map((img) => img.url);
        this.product = new ProductPage(
          res.id,
          res.name['en-US'],
          res.description['en-US'],
          res.masterVariant.prices[0].value.centAmount,
          res.masterVariant.prices[0].discounted?.value.centAmount,
          imgs,
        );
        if (cart && 'id' in cart) {
          const inCart = cart.lineItems.find((i) => i.productId === res.id);
          if (inCart) {
            this.product.showRemoveBtn();
          }
        }
        const type = this.catalog.idsTypes.get(res.productType.id);
        const id = res.masterVariant.sku;
        this.checkRoute(`/catalog/${type}/${id}`, this.product.getNode());
        this.router.changeRoute(`/catalog/${type}/${id}`);
        this.header.clearActiveClass();
      } else {
        this.element.append(new ErrMsg(res.message).getNode());
      }
    }
  }

  async getCart(
    token: TokenResponse,
  ): Promise<{ cartVersion: number | null; cartProducts: LineItem[] }> {
    let cartVersion: number | null = null;
    let cartProducts: LineItem[] = [];
    if (!this.cartId) {
      let cart;
      if (this.customerId) {
        cart = await createCart(token, this.customerId);
      } else {
        cart = await createCart(token);
      }
      if ('id' in cart) {
        this.cartId = cart.id;
        cartVersion = cart.version;
        cartProducts = cart.lineItems;
      }
    }
    return { cartVersion, cartProducts };
  }

  async addToCartHandler(e: CustomEvent) {
    const token = await App.checkToken();
    if (token) {
      let { cartVersion } = await this.getCart(token);
      if (!cartVersion) {
        const cartRes = await getCartById(token, this.cartId as string);
        if ('id' in cartRes) {
          cartVersion = cartRes.version;
        }
      }
      const res = await addToCart(
        token,
        this.cartId as string,
        cartVersion as number,
        e.detail,
      );
      if ('id' in res) {
        this.header.userMenu.cart.setTextContent(
          `cart(${res.totalLineItemQuantity})`,
        );
        this.catalog.catalogList?.checkIfProductInCart(res.lineItems);
        this.cart = new CartPage(res);
        this.checkRoute('/cart', this.cart.getNode());
      } else {
        this.element.append(new ErrMsg(res.message).getNode());
      }
    }
  }

  async updateCartHandler(e: CustomEvent) {
    const token = await App.checkToken();
    if (token) {
      let { cartVersion, cartProducts } = await this.getCart(token);
      if (!cartVersion) {
        const cartRes = await getCartById(token, this.cartId as string);
        if ('id' in cartRes) {
          cartVersion = cartRes.version;
          if ('delProductId' in e.detail) {
            cartProducts = cartRes.lineItems;
          }
        }
      }
      const delData = [
        {
          action: 'removeLineItem',
          lineItemId: cartProducts.find(
            (i) => i.productId === e.detail.delProductId,
          )?.id,
        },
      ];
      const preload = new Preloader();
      this.element.append(preload.getNode());
      const res = await updateCart(
        token,
        this.cartId as string,
        cartVersion as number,
        'delProductId' in e.detail ? delData : e.detail,
      );
      preload.destroy();
      if ('id' in res) {
        let cartTextHeader;
        if (res.totalLineItemQuantity) {
          cartTextHeader = `cart(${res.totalLineItemQuantity})`;
        } else {
          cartTextHeader = 'cart';
        }
        this.header.userMenu.cart.setTextContent(cartTextHeader);
        this.catalog.catalogList?.checkIfProductInCart(res.lineItems);
        this.cart = new CartPage(res);
        this.checkRoute('/cart', this.cart.getNode());
        if (window.location.pathname === '/cart') {
          this.router.changeRoute('/cart');
        }
      } else {
        this.element.append(new ErrMsg(res.message).getNode());
      }
    }
  }

  addListeners() {
    this.element.addEventListener('change-page', (e) => {
      this.changePageHandler(e as CustomEvent);
    });
    this.element.addEventListener('login', async (e) => {
      this.loginHandler(e as CustomEvent);
    });
    this.element.addEventListener('logout', () => {
      this.logoutHandler();
    });
    this.element.addEventListener('reg-customer', async (e) => {
      this.regCustomerHandler(e as CustomEvent);
    });
    this.element.addEventListener('update-customer', async (e) => {
      this.updateCustomerHandler(e as CustomEvent);
    });
    this.element.addEventListener('change-pass', async (e) => {
      this.changePassHandler(e as CustomEvent);
    });
    this.element.addEventListener('update-catalog', async (e) => {
      this.updateCatalogHandler(e as CustomEvent);
    });
    this.element.addEventListener('open-product', async (e) => {
      this.openProductHandler(e as CustomEvent);
    });
    this.element.addEventListener('add-to-cart', async (e) => {
      this.addToCartHandler(e as CustomEvent);
    });
    this.element.addEventListener('update-cart', async (e) => {
      this.updateCartHandler(e as CustomEvent);
    });
  }
}

const app = new App();
app.addListeners();
if (!app.isLogin) {
  app.getProducts();
}
