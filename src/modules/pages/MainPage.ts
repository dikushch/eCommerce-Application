import BaseComponent from '../components/BaseComponent';

export default class MainPage extends BaseComponent {
  constructor() {
    super({
      tag: 'section',
      classes: ['main', 'container'],
    });

    const imageContainer = new BaseComponent({
      tag: 'div',
      classes: ['main__hero', 'hero'],
    });

    const subText = new BaseComponent({
      tag: 'p',
      classes: ['hero-sub'],
      text: 'it`s',
    });

    const textHero = new BaseComponent({
      tag: 'h2',
      classes: ['hero-text'],
      text: 'SUMMER SHOP',
    });

    const subText2 = new BaseComponent({
      tag: 'p',
      classes: ['hero-sub2'],
      text: 'find your sunshine style',
    });

    this.append(imageContainer);
    imageContainer.append(subText);
    imageContainer.append(textHero);
    imageContainer.append(subText2);

    const productLineDiv = new BaseComponent({
      tag: 'div',
      classes: ['product'],
    });

    const productLineText = new BaseComponent({
      tag: 'p',
      classes: ['product-text'],
      text: 'in our product line',
    });

    const productLineItems = new BaseComponent({
      tag: 'div',
      classes: ['product-items', 'item'],
    });

    const shirtItem = new BaseComponent({
      tag: 'div',
      classes: ['product-item', 'shirt-item'],
      text: 'shirts and T-shirts',
    });

    const shortsItem = new BaseComponent({
      tag: 'div',
      classes: ['product-item', 'shorts-item'],
      text: 'shorts',
    });

    const accessoriesItem = new BaseComponent({
      tag: 'div',
      classes: ['product-item', 'accessories-item'],
      text: 'accessories',
    });

    const somethingMoreItem = new BaseComponent({
      tag: 'div',
      classes: ['product-item', 'something-more-item'],
      text: 'and something more',
    });

    this.append(productLineDiv);
    productLineDiv.append(productLineText);
    productLineDiv.append(productLineItems);
    productLineItems.append(shirtItem);
    productLineItems.append(shortsItem);
    productLineItems.append(accessoriesItem);
    productLineItems.append(somethingMoreItem);
  }
}
