import { Cart } from '../types/Types';
import BaseComponent from './BaseComponent';
import Button from './Button';

export default class CartPromocodeBlock extends BaseComponent {
  clearCartBtn: Button;

  constructor(cartData: Cart) {
    super({ classes: ['cart_price'] });

    const pricesDiv = new BaseComponent({
      classes: ['cart_price-container'],
    });

    const totalPriceDiv = new BaseComponent(
      {
        classes: ['cart_price-container_total_price'],
      },
      new BaseComponent({
        classes: ['cart_price-h3'],
        tag: 'h3',
        text: 'Price: ',
      }),
    );

    const totalPriceNumber = new BaseComponent({
      classes: ['cart_price-h3'],
      tag: 'h3',
      text: `${(cartData.totalPrice.centAmount / 100).toFixed(2)} $`,
    });

    pricesDiv.appendChildren([totalPriceDiv]);

    if (cartData.discountOnTotalPrice) {
      const dicountPrice = (
        +(cartData.totalPrice.centAmount / 100) -
        +(cartData.discountOnTotalPrice.discountedAmount.centAmount / 100)
      ).toFixed(2);

      const withPromocodePrice = new BaseComponent({
        classes: ['cart_price-h3', 'promocode'],
        tag: 'h3',
        text: `with promocode: ${dicountPrice} $`,
      });

      totalPriceNumber.addClass('line-through');

      pricesDiv.append(withPromocodePrice);
    }
    totalPriceDiv.append(totalPriceNumber);

    this.clearCartBtn = new Button({
      text: 'clear cart',
      classes: ['cart_item-btn', 'red'],
    });

    // add listeners
    this.clearCartBtn.addListener('click', () => {
      console.log('clear cart btn click');
    });

    // add on page
    this.append(pricesDiv);
    this.append(this.clearCartBtn);
  }
}
