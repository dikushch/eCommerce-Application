import {
  changeCustomerPass,
  createCustomer,
  getAccessToken,
  getCustomerById,
  loginCustomer,
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
import { RouteItem } from './modules/types/Types';
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

  product: ProductPage;

  constructor() {
    this.isLogin = this.checkStorage();
    this.header = new Header(this.isLogin);
    this.element.append(this.header.getNode());
    this.notFoundPage = new NotFoundPage();
    this.main = new MainPage();
    this.login = new LoginPage();
    this.register = new RegistrationPage();
    this.catalog = new CatalogPage();
    this.product = new ProductPage(
      'Red shirt with print',
      'Great shirt made of premium materials with a juicy print',
      3000,
      2000,
      [
        'https://images.cdn.australia-southeast1.gcp.commercetools.com/667a149d-1134-4297-9d6c-699187c4205e/2%20%281%29-vKzesj9M.jpg',
        'https://images.cdn.australia-southeast1.gcp.commercetools.com/667a149d-1134-4297-9d6c-699187c4205e/1-k-mMeUwr.jpg',
        'https://images.cdn.australia-southeast1.gcp.commercetools.com/667a149d-1134-4297-9d6c-699187c4205e/3-nhIai5J1.jpg',
      ],
    );
    const routes: RouteItem[] = [
      { path: '/', component: this.main.getNode() },
      { path: '/login', component: this.login.getNode() },
      { path: '/register', component: this.register.getNode() },
      { path: '/catalog', component: this.catalog.getNode() },
      { path: '/product', component: this.product.getNode() },
      { path: '/404', component: this.notFoundPage.getNode() },
    ];
    this.router = new Router(this.isLogin, routes);
    this.setMenuItemActive(window.location.pathname);
    if (this.isLogin) {
      this.loginCustomer();
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
    const storageToken = App.getToken();
    let token;
    if (storageToken) {
      token = JSON.parse(storageToken);
    } else {
      token = await getAccessToken();
      App.saveToken(JSON.stringify(token));
    }
    if (token) {
      App.saveToken(JSON.stringify(token));
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
    const storageToken = App.getToken();
    let token;
    if (storageToken) {
      token = JSON.parse(storageToken);
    } else {
      token = await getAccessToken();
      App.saveToken(JSON.stringify(token));
    }
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

  updateProfileRout() {
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

  async updateCustomerHandler(e: CustomEvent) {
    const storageToken = App.getToken();
    let token;
    if (storageToken) {
      token = JSON.parse(storageToken);
    } else {
      token = await getAccessToken();
      App.saveToken(JSON.stringify(token));
    }
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
    const storageToken = App.getToken();
    let token;
    if (storageToken) {
      token = JSON.parse(storageToken);
    } else {
      token = await getAccessToken();
      App.saveToken(JSON.stringify(token));
    }
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
  }
}

const app = new App();
app.addListeners();
