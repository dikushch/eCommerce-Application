import { getAccessToken, loginCustomer } from './modules/api/Api';
import ErrMsg from './modules/components/ErrMsg';
import Header from './modules/components/Header';
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

  constructor() {
    this.header = new Header(false);
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
    this.router = new Router(routes);
    this.setMenuItemActive(window.location.pathname);
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
      const res = await loginCustomer(token, (e as CustomEvent).detail);
      if ('customer' in res) {
        this.router.setLoginState(true);
        this.header.userMenu.changeLinks();
        this.router.changeRoute('/');
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
