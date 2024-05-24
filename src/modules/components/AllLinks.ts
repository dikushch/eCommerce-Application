import BaseComponent from './BaseComponent';

export default class AllLinks extends BaseComponent {
  main: BaseComponent;

  catalog: BaseComponent;

  about: BaseComponent;

  cart: BaseComponent;

  login: BaseComponent;

  register: BaseComponent;

  profile: BaseComponent;

  product: BaseComponent;

  constructor() {
    super({ classes: ['all-links'] });
    const title = new BaseComponent({
      tag: 'p',
      text: 'all links:',
      classes: ['all-links__title'],
    });
    this.main = new BaseComponent({
      tag: 'a',
      text: 'main',
      classes: ['all-links__item'],
    });
    this.catalog = new BaseComponent({
      tag: 'a',
      text: 'catalog',
      classes: ['all-links__item'],
    });
    this.about = new BaseComponent({
      tag: 'a',
      text: 'about',
      classes: ['all-links__item'],
    });
    this.cart = new BaseComponent({
      tag: 'a',
      text: 'cart',
      classes: ['all-links__item'],
    });
    this.login = new BaseComponent({
      tag: 'a',
      text: 'login',
      classes: ['all-links__item'],
    });
    this.register = new BaseComponent({
      tag: 'a',
      text: 'register',
      classes: ['all-links__item'],
    });
    this.profile = new BaseComponent({
      tag: 'a',
      text: 'profile',
      classes: ['all-links__item'],
    });
    this.product = new BaseComponent({
      tag: 'a',
      text: 'product',
      classes: ['all-links__item'],
    });

    this.main.setAttribute('data-href', '/');
    this.catalog.setAttribute('data-href', '/catalog');
    this.about.setAttribute('data-href', '/about');
    this.cart.setAttribute('data-href', '/cart');
    this.login.setAttribute('data-href', '/login');
    this.register.setAttribute('data-href', '/register');
    this.profile.setAttribute('data-href', '/profile');
    this.product.setAttribute('data-href', '/product');

    this.appendChildren([
      title,
      this.main,
      this.catalog,
      this.about,
      this.cart,
      this.login,
      this.register,
      this.profile,
      this.product,
    ]);

    this.addListener('click', (e) => {
      if (e.target instanceof HTMLElement) {
        if (e.target.closest('.all-links__item')) {
          this.dispatchChangePageEvent(e.target);
        }
      }
    });
  }

  dispatchChangePageEvent(link: HTMLElement): void {
    const event = new CustomEvent('change-page', {
      bubbles: true,
      detail: link.dataset.href,
    });
    this.getNode().dispatchEvent(event);
  }
}
