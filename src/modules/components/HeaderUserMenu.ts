import BaseComponent from './BaseComponent';

export default class HeaderUserMenu extends BaseComponent {
  cart: BaseComponent;

  login: BaseComponent;

  register: BaseComponent;

  user: BaseComponent;

  logout: BaseComponent;

  constructor() {
    super({ tag: 'nav', classes: ['header__user-links', 'u-links'] });
    this.cart = new BaseComponent({
      tag: 'a',
      text: 'cart',
      classes: ['u-links__item'],
    });

    const devider1 = new BaseComponent({ tag: 'span', text: '/' });

    this.login = new BaseComponent({
      tag: 'a',
      text: 'login',
      classes: ['u-links__item'],
    });

    const devider2 = new BaseComponent({ tag: 'span', text: '/' });

    this.register = new BaseComponent({
      tag: 'a',
      text: 'register',
      classes: ['u-links__item'],
    });

    const unregLinks = new BaseComponent(
      { classes: ['u-links__box'] },
      this.login,
      devider2,
      this.register,
    );

    this.user = new BaseComponent({
      tag: 'a',
      classes: ['u-links__item'],
    });

    const devider3 = new BaseComponent({ tag: 'span', text: '/' });

    this.logout = new BaseComponent({
      tag: 'a',
      text: 'logout',
      classes: ['u-links__item'],
    });

    const regLinks = new BaseComponent(
      { classes: ['u-links__box', 'hide'] },
      this.user,
      devider3,
      this.logout,
    );

    const container = new BaseComponent(
      { classes: ['u-links__container'] },
      this.cart,
      devider1,
      unregLinks,
      regLinks,
    );

    this.cart.setAttribute('data-href', '/cart');
    this.user.setAttribute('data-href', '/user');
    this.login.setAttribute('data-href', '/login');
    this.register.setAttribute('data-href', '/register');
    this.logout.setAttribute('data-href', '/logout');

    this.append(container);
  }
}
