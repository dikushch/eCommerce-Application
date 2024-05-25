import BaseComponent from '../components/BaseComponent';

export default class ProductPage extends BaseComponent {
  name: string;

  descr: string;

  price: number;

  discount?: number;

  constructor(name: string, descr: string, price: number, discount?: number) {
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
      salePrice = new BaseComponent({
        tag: 'span',
        text: `${this.discount}$`,
        classes: ['sale-price'],
      });

      saleLabel = new BaseComponent({
        tag: 'span',
        text: 'sale',
        classes: ['sale-label'],
      });
    }

    const addToCartButton = new BaseComponent({
      tag: 'button',
      text: 'add to cart',
      classes: ['add-to-cart'],
    });

    productContainer.append(productName);
    productContainer.append(productDescription);

    if (saleLabel && salePrice) {
      priceContainer.append(saleLabel);
      priceContainer.append(salePrice);
    }
    priceContainer.append(originalPrice);
    productContainer.append(priceContainer);
    productContainer.append(addToCartButton);

    this.append(productContainer);
  }
}
