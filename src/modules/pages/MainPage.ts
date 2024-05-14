import BaseComponent from '../components/BaseComponent';

export default class MainPage extends BaseComponent {
  constructor() {
    super({
      tag: 'section',
      classes: ['main'],
    });

    const imageContainer = MainPage.createComponent('div', [
      'main__hero',
      'hero',
    ]);

    const subText = MainPage.createComponent('p', ['hero-sub'], 'it`s');

    const textHero = MainPage.createComponent(
      'h2',
      ['hero-text'],
      'SUMMER SHOP',
    );

    const subText2 = MainPage.createComponent(
      'p',
      ['hero-sub2'],
      'find your sunshine style',
    );

    this.append(imageContainer);
    imageContainer.append(subText);
    imageContainer.append(textHero);
    imageContainer.append(subText2);

    const productLineDiv = MainPage.createComponent('div', ['product']);

    const productLineText = MainPage.createComponent(
      'p',
      ['product-text'],
      'in our product line',
    );

    const productLineItems = MainPage.createComponent('div', [
      'product-items',
      'item',
    ]);

    const shirtItem = MainPage.createComponent(
      'div',
      ['product-item', 'shirt-item'],
      'shirts and T-shirts',
    );

    const shortsItem = MainPage.createComponent(
      'div',
      ['product-item', 'shorts-item'],
      'shorts',
    );

    const accessoriesItem = MainPage.createComponent(
      'div',
      ['product-item', 'accessories-item'],
      'accessories',
    );

    const somethingMoreItem = MainPage.createComponent(
      'div',
      ['product-item', 'something-more-item'],
      'and something more',
    );

    this.append(productLineDiv);
    productLineDiv.append(productLineText);
    productLineDiv.append(productLineItems);
    productLineItems.append(shirtItem);
    productLineItems.append(shortsItem);
    productLineItems.append(accessoriesItem);
    productLineItems.append(somethingMoreItem);
  }

  static createComponent(
    tag: string,
    classes: string[] = [],
    text: string = '',
  ): BaseComponent {
    return new BaseComponent({
      tag,
      classes,
      text,
    });
  }
}
