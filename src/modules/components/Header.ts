import BaseComponent from './BaseComponent';
import HeaderLogo from './HeaderLogo';
import HeaderMainMenu from './HeaderMainMenu';
import HeaderUserMenu from './HeaderUserMenu';

export default class Header extends BaseComponent {
  mainMenu: HeaderMainMenu;

  userMenu: HeaderUserMenu;

  brg: BaseComponent;

  constructor() {
    super({ tag: 'heeader', classes: ['header', 'container'] });
    const logo = new HeaderLogo();
    this.mainMenu = new HeaderMainMenu();
    this.userMenu = new HeaderUserMenu();
    this.brg = new BaseComponent({ classes: ['brg'] });

    this.append(logo);
    this.append(this.mainMenu);
    this.append(this.userMenu);
    this.append(this.brg);

    this.brg.addListener('click', () => {
      this.openMenu();
    });
  }

  openMenu(): void {
    this.brg.toggleClass('open');
    this.mainMenu.toggleClass('open');
    this.userMenu.toggleClass('open');
  }
}
