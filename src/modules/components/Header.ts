import BaseComponent from './BaseComponent';
import HeaderLogo from './HeaderLogo';
import HeaderMainMenu from './HeaderMainMenu';
import HeaderUserMenu from './HeaderUserMenu';

export default class Header extends BaseComponent {
  mainMenu: HeaderMainMenu;

  userMenu: HeaderUserMenu;

  brg: BaseComponent;

  links: HTMLElement[];

  logout: BaseComponent;

  constructor(isLogin: boolean) {
    super({ tag: 'heeader', classes: ['header', 'container'] });
    const logo = new HeaderLogo();
    this.mainMenu = new HeaderMainMenu();
    this.userMenu = new HeaderUserMenu(isLogin);
    this.logout = this.userMenu.logout;
    this.brg = new BaseComponent({ classes: ['brg'] });

    this.append(logo);
    this.append(this.mainMenu);
    this.append(this.userMenu);
    this.append(this.brg);

    this.links = [
      this.mainMenu.mainLink.getNode(),
      this.mainMenu.catalogLink.getNode(),
      this.mainMenu.aboutLink.getNode(),
      this.userMenu.cart.getNode(),
      this.userMenu.login.getNode(),
      this.userMenu.register.getNode(),
      this.userMenu.profile.getNode(),
    ];

    this.brg.addListener('click', () => {
      this.openMenu();
    });

    this.logout.addListener('click', () => {
      this.dispatchLogoutEvent();
    });

    this.addListener('click', (e) => {
      if (e.target instanceof HTMLElement) {
        if (this.links.includes(e.target)) {
          this.setActiveLink(e.target);
          this.dispatchChangePageEvent(e.target);
        }
      }
    });
  }

  openMenu(): void {
    this.brg.toggleClass('open');
    this.mainMenu.toggleClass('open');
    this.userMenu.toggleClass('open');
  }

  setActiveLink(link: HTMLElement): void {
    const clickedLink = this.links.find((l) => l === link);
    if (!clickedLink?.classList.contains('active')) {
      this.clearActiveClass();
      clickedLink?.classList.add('active');
      this.closeBrg();
    }
  }

  clearActiveClass(): void {
    this.links.forEach((l) => {
      l.classList.remove('active');
    });
  }

  closeBrg(): void {
    this.brg.removeClass('open');
    this.mainMenu.removeClass('open');
    this.userMenu.removeClass('open');
  }

  dispatchChangePageEvent(link: HTMLElement): void {
    const event = new CustomEvent('change-page', {
      bubbles: true,
      detail: link.dataset.href,
    });
    this.getNode().dispatchEvent(event);
  }

  findLink(name: string): HTMLElement | null {
    const link = this.links.find(
      (l) => l.textContent?.toLowerCase() === name.toLowerCase(),
    );
    if (link) {
      return link;
    }
    return null;
  }

  dispatchLogoutEvent(): void {
    const event = new CustomEvent('logout', {
      bubbles: true,
    });
    this.getNode().dispatchEvent(event);
  }
}
