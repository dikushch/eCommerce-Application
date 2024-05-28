import BaseComponent from './BaseComponent';

export default class CatalogProductTypes extends BaseComponent {
  all: BaseComponent;

  tshirts: BaseComponent;

  shirts: BaseComponent;

  shorts: BaseComponent;

  glasses: BaseComponent;

  hats: BaseComponent;

  links: HTMLElement[];

  constructor() {
    super({ tag: 'ul', classes: ['c-types__list'] });
    this.all = new BaseComponent({
      tag: 'a',
      text: 'all',
      classes: ['c-types__link'],
    });
    this.all.setAttribute('data-type', '');
    const allLi = new BaseComponent(
      { tag: 'li', classes: ['c-types__item'] },
      this.all,
    );

    this.tshirts = new BaseComponent({
      tag: 'a',
      text: 't-shirts',
      classes: ['c-types__link'],
    });
    this.tshirts.setAttribute('data-type', 't-shirt');
    const tshirtsLi = new BaseComponent(
      { tag: 'li', classes: ['c-types__item'] },
      this.tshirts,
    );

    this.shirts = new BaseComponent({
      tag: 'a',
      text: 'shirts',
      classes: ['c-types__link'],
    });
    this.shirts.setAttribute('data-type', 'shirt');
    const shirtsLi = new BaseComponent(
      { tag: 'li', classes: ['c-types__item'] },
      this.shirts,
    );

    this.shorts = new BaseComponent({
      tag: 'a',
      text: 'shorts',
      classes: ['c-types__link'],
    });
    this.shorts.setAttribute('data-type', 'short');
    const shortsLi = new BaseComponent(
      { tag: 'li', classes: ['c-types__item'] },
      this.shorts,
    );

    this.glasses = new BaseComponent({
      tag: 'a',
      text: 'glasses',
      classes: ['c-types__link'],
    });
    this.glasses.setAttribute('data-type', 'glasses');
    const glassesLi = new BaseComponent(
      { tag: 'li', classes: ['c-types__item'] },
      this.glasses,
    );

    this.hats = new BaseComponent({
      tag: 'a',
      text: 'hats',
      classes: ['c-types__link'],
    });
    this.hats.setAttribute('data-type', 'hat');
    const hatsLi = new BaseComponent(
      { tag: 'li', classes: ['c-types__item'] },
      this.hats,
    );

    this.links = [
      this.all.getNode(),
      this.tshirts.getNode(),
      this.shirts.getNode(),
      this.shorts.getNode(),
      this.glasses.getNode(),
      this.hats.getNode(),
    ];

    this.appendChildren([
      allLi,
      tshirtsLi,
      shirtsLi,
      shortsLi,
      glassesLi,
      hatsLi,
    ]);
  }

  setActiveLink(link: HTMLElement): void {
    const clickedLink = this.links.find((l) => l === link);
    if (!clickedLink?.classList.contains('active')) {
      this.clearActiveClass();
      clickedLink?.classList.add('active');
    }
  }

  clearActiveClass(): void {
    this.links.forEach((l) => {
      l.classList.remove('active');
    });
  }
}
