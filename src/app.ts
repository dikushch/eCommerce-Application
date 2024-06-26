import {
  changeCustomerPass,
  createCustomer,
  getAccessToken,
  getCustomerById,
  getProductById,
  getProductByKey,
  loginCustomer,
  searchProducts,
  updateCustomer,
} from './modules/api/Api';
import ErrMsg from './modules/components/ErrMsg';
import Header from './modules/components/Header';
import OkMsg from './modules/components/OkMsg';
import Preloader from './modules/components/Preloader';
import CatalogPage from './modules/pages/CatalogPage';
import LoginPage from './modules/pages/LoginPage';
import MainPage from './modules/pages/MainPage';
import NotFoundPage from './modules/pages/NotFoundPage';
import ProductPage from './modules/pages/ProductPage';
import ProfilePage from './modules/pages/ProfilePage';
import RegistrationPage from './modules/pages/RegPage';
import Router from './modules/router/Router';
import { RouteItem, TokenResponse } from './modules/types/Types';
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
    const routes: RouteItem[] = [
      { path: '/', component: this.main.getNode() },
      { path: '/login', component: this.login.getNode() },
      { path: '/register', component: this.register.getNode() },
      { path: '/catalog', component: this.catalog.getNode() },
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
    if ('limit' in data) {
      this.catalog.createProductsList(data);
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
      const res = await loginCustomer(token, (e as CustomEvent).detail);
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
      const res = await createCustomer(token, e.detail);
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
      const res = await searchProducts(token, e.detail);
      preload.destroy();
      if ('limit' in res) {
        this.catalog.createProductsList(res);
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
      preload.destroy();
      if ('id' in res) {
        const imgs = res.masterVariant.images.map((img) => img.url);
        this.product = new ProductPage(
          res.name['en-US'],
          res.description['en-US'],
          res.masterVariant.prices[0].value.centAmount,
          res.masterVariant.prices[0].discounted?.value.centAmount,
          imgs,
        );
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
  }
}

const app = new App();
app.addListeners();
app.getProducts();
