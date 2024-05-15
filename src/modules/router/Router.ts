export default class Router {
  routes: { path: string; component: HTMLElement }[];

  currentRoute: null | HTMLElement = null;

  isLogin: boolean = false;

  constructor(routes: { path: string; component: HTMLElement }[]) {
    this.routes = routes;
    this.init();
  }

  init(): void {
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname);
    });
    this.handleRoute(window.location.pathname);
  }

  handleRoute(routePath: string): void {
    const matchedRoute = this.routes.find((route) => route.path === routePath);
    if (matchedRoute) {
      if (this.currentRoute) {
        this.currentRoute.remove();
      }
      if (
        this.isLogin &&
        (matchedRoute.path === '/login' || matchedRoute.path === '/register')
      ) {
        this.redirectToMain();
      } else {
        this.currentRoute = matchedRoute.component;
        document.body.append(this.currentRoute);
      }
    } else {
      this.redirectToNotFound();
    }
  }

  redirectToNotFound(): void {
    const notFoundPage = this.routes.find((route) => route.path === '/404');
    if (notFoundPage) {
      this.currentRoute = notFoundPage.component;
      document.body.append(this.currentRoute);
    }
  }

  redirectToMain(): void {
    const main = this.routes.find((route) => route.path === '/');
    if (main) {
      if (this.currentRoute) {
        this.currentRoute.remove();
      }
      this.currentRoute = main.component;
      document.body.append(this.currentRoute);
    }
  }

  changeRoute(route: string): void {
    window.history.pushState({}, '', route);
    this.handleRoute(route);
  }

  setLoginState(state: boolean): void {
    this.isLogin = state;
  }
}
