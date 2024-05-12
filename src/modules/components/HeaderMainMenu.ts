import BaseComponent from './BaseComponent';

export default class HeaderMainMenu extends BaseComponent {
  mainLink: BaseComponent;

  catalogLink: BaseComponent;

  aboutLink: BaseComponent;

  constructor() {
    super({ tag: 'nav', classes: ['header__nav', 'nav'] });
    this.mainLink = new BaseComponent({
      tag: 'a',
      text: 'MAIN',
      classes: ['nav__link'],
    });
    const mainLinkLi = new BaseComponent(
      { tag: 'li', classes: ['nav__item'] },
      this.mainLink,
    );

    this.catalogLink = new BaseComponent({
      tag: 'a',
      text: 'CATALOG',
      classes: ['nav__link'],
    });
    const catalogLinkLi = new BaseComponent(
      { tag: 'li', classes: ['nav__item'] },
      this.catalogLink,
    );

    this.aboutLink = new BaseComponent({
      tag: 'a',
      text: 'ABOUT',
      classes: ['nav__link'],
    });
    const aboutLinkLi = new BaseComponent(
      { tag: 'li', classes: ['nav__item'] },
      this.aboutLink,
    );

    const list = new BaseComponent(
      { tag: 'ul', classes: ['nav__list'] },
      mainLinkLi,
      catalogLinkLi,
      aboutLinkLi,
    );

    this.append(list);
  }
}
