import BaseComponent from './BaseComponent';
import Button from './Button';

export default class CartEmptyBlock extends BaseComponent {
  catalogBtn: Button;

  constructor() {
    super({ classes: ['cart_empty'] });

    const emptyTitle = new BaseComponent({
      classes: ['cart_empty-p'],
      tag: 'P',
      text: 'CART IS EMPTY',
    });

    // add on page
    this.append(emptyTitle);
    this.append(
      (this.catalogBtn = new Button({
        text: 'view CATALOG',
        classes: ['cart_empty-btn'],
      })),
    );
    // add listener
    this.catalogBtn.addListener('click', () => {
      this.dispatchGoToCatalogEvent();
    });
  }

  dispatchGoToCatalogEvent(): void {
    const event = new CustomEvent('change-page', {
      bubbles: true,
      detail: '/catalog',
    });
    this.getNode().dispatchEvent(event);
  }
}
