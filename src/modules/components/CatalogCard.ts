import { OneProduct } from '../types/Types';
import BaseComponent from './BaseComponent';
import Button from './Button';

export default class CatalogCard extends BaseComponent {
  id: string;

  addBtn: Button;

  constructor(productInfo: OneProduct) {
    super({ tag: 'li', classes: ['catalog__item', 'c-item'] });
    this.id = productInfo.id;
    const name = new BaseComponent({
      tag: 'h3',
      text: `${productInfo.name['en-US']}`,
      classes: ['c-item__name'],
    });
    const descr = new BaseComponent({
      tag: 'p',
      text: `${productInfo.description['en-US']}`,
      classes: ['c-item__descr'],
    });
    const img = new BaseComponent({
      tag: 'img',
      classes: ['c-item__img'],
    });
    img.setAttribute('src', `${productInfo.masterVariant.images[0].url}`);
    const price = new BaseComponent({
      tag: 'p',
      text: `${(productInfo.masterVariant.prices[0].value.centAmount / 100).toFixed(2)} $`,
      classes: ['c-item__price'],
    });
    let discount = null;
    if (productInfo.masterVariant.prices[0].discounted) {
      discount = new BaseComponent({
        tag: 'p',
        text: `${(productInfo.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(2)} $`,
        classes: ['c-item__discount'],
      });
    }
    const priceCaontainer = new BaseComponent(
      {
        classes: ['c-item__price-box'],
      },
      price,
    );
    if (discount) {
      priceCaontainer.append(discount);
    }
    this.addBtn = new Button({ text: 'add to cart', classes: ['c-item__btn'] });

    this.appendChildren([name, img, descr, priceCaontainer, this.addBtn]);

    this.addListener('click', (e) => {
      this.cardHandler(e);
    });

    this.addBtn.addListener('click', (e) => {
      e.stopPropagation();
      this.dispatchAddToCartEvent(this.id);
    });
  }

  cardHandler(e: Event): void {
    if (e.target instanceof HTMLElement) {
      const card = e.target.closest('.c-item');
      if (card instanceof HTMLElement) {
        this.dispatchOpenProductEvent();
      }
    }
  }

  dispatchOpenProductEvent(): void {
    const event = new CustomEvent('open-product', {
      bubbles: true,
      detail: this.id,
    });
    this.getNode().dispatchEvent(event);
  }

  dispatchAddToCartEvent(id: string): void {
    const event = new CustomEvent('add-to-cart', {
      bubbles: true,
      detail: id,
    });
    this.getNode().dispatchEvent(event);
  }
}
