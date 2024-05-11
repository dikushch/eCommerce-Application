import BaseComponent from './BaseComponent';
import HeaderLogo from './HeaderLogo';
import HeaderMainMenu from './HeaderMainMenu';
import HeaderUserMenu from './HeaderUserMenu';

export default class Header extends BaseComponent {
  mainMenu: HeaderMainMenu;

  userMenu: HeaderUserMenu;

  constructor() {
    super({ tag: 'heeader', classes: ['header'] });
    const logo = new HeaderLogo();
    this.mainMenu = new HeaderMainMenu();
    this.userMenu = new HeaderUserMenu();

    this.append(logo);
    this.append(this.mainMenu);
    this.append(this.userMenu);
  }
}
