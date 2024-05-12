import BaseComponent from './BaseComponent';

export default class HeaderLogo extends BaseComponent {
  constructor() {
    super({ classes: ['header__logo'] });

    const logo = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'href',
      './assets/logo.svg#logo',
    );
    logo.append(use);
    this.getNode().append(logo);
  }
}
