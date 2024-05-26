import BaseComponent from '../components/BaseComponent';

export default class ProductPage extends BaseComponent {
  name: string;

  descr: string;

  price: number;

  discount?: number;

  imgs?: string[];

  constructor(
    name: string,
    descr: string,
    price: number,
    discount?: number,
    imgs?: string[],
  ) {
    super({
      tag: 'section',
      classes: ['product-page', 'container'],
    });
    this.name = name;
    this.descr = descr;
    this.price = price;
    if (discount) {
      this.discount = discount;
    }
    if (imgs) {
      this.imgs = imgs;
    }

    const productContainer = new BaseComponent({
      tag: 'div',
      classes: ['product-container'],
    });

    const productName = new BaseComponent({
      tag: 'h1',
      text: this.name,
      classes: ['product-name'],
    });

    const productDescription = new BaseComponent({
      tag: 'p',
      text: this.descr,
      classes: ['product-description'],
    });

    const priceContainer = new BaseComponent({
      tag: 'div',
      classes: ['price-container'],
    });

    const originalPrice = new BaseComponent({
      tag: 'span',
      text: `${this.price}$`,
      classes: ['original-price'],
    });

    let salePrice: BaseComponent<HTMLElement> | null = null;
    let saleLabel: BaseComponent<HTMLElement> | null = null;

    if (this.discount) {
      const saleWrapper = new BaseComponent({
        tag: 'div',
        classes: ['sale-wrapper'],
      });

      saleLabel = new BaseComponent({
        tag: 'span',
        text: 'sale',
        classes: ['sale-label'],
      });

      salePrice = new BaseComponent({
        tag: 'span',
        text: `${this.discount}$`,
        classes: ['sale-price'],
      });

      saleWrapper.append(saleLabel);
      saleWrapper.append(salePrice);
      priceContainer.append(saleWrapper);
    }

    priceContainer.append(originalPrice);
    productContainer.append(productName);
    productContainer.append(productDescription);
    productContainer.append(priceContainer);

    const addToCartButton = new BaseComponent({
      tag: 'button',
      text: 'add to cart',
      classes: ['add-to-cart'],
    });

    productContainer.append(addToCartButton);
    this.append(productContainer);
  }
}
