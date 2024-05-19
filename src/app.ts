import { getAccessToken, loginCustomer } from './modules/api/Api';
import ErrMsg from './modules/components/ErrMsg';
import Header from './modules/components/Header';
import OkMsg from './modules/components/OkMsg';
import LoginPage from './modules/pages/LoginPage';
import MainPage from './modules/pages/MainPage';
import NotFoundPage from './modules/pages/NotFoundPage';
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

  constructor() {
    this.isLogin = this.checkStorage();
    this.header = new Header(this.isLogin);
    this.element.append(this.header.getNode());
    this.notFoundPage = new NotFoundPage();
    this.main = new MainPage();
    this.login = new LoginPage();
    this.register = new RegistrationPage();
    const routes: RouteItem[] = [
      { path: '/', component: this.main.getNode() },
      { path: '/login', component: this.login.getNode() },
      { path: '/register', component: this.register.getNode() },
      { path: '/404', component: this.notFoundPage.getNode() },
    ];
    this.router = new Router(this.isLogin, routes);
    this.setMenuItemActive(window.location.pathname);
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
    console.log(path);
    this.setMenuItemActive(path);
    this.router.changeRoute(path);
  }

  async loginHandler(e: CustomEvent) {
    const token = await getAccessToken();
    if (token) {
      App.saveToken(token.access_token);
      const res = await loginCustomer(token, (e as CustomEvent).detail);
      if ('customer' in res) {
        App.saveCustomerId(res.customer.id);
        this.router.setLoginState(true);
        this.header.userMenu.changeLinks();
        this.router.changeRoute('/');
        this.element.append(new OkMsg('successful login').getNode());
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
  }
}

const app = new App();
app.addListeners();
