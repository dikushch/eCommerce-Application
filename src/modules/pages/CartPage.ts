import BaseComponent from '../components/BaseComponent';
import CartProductBlock from '../components/CartProductBlock';
import { Cart } from '../types/Types';

export default class CartPage extends BaseComponent {
  cartData?: Cart;

  constructor(cartData?: Cart) {
    super({ tag: 'section', classes: ['cart', 'container'] });
    const cartItemsDiv = new BaseComponent({
      classes: ['cart-items'],
    });

    if (cartData) {
      this.cartData = cartData;

      // add all items in div
      cartData.lineItems.forEach((item) => {
        cartItemsDiv.appendChildren([new CartProductBlock(item)]);
        // console.log(item);
      });

      // add on page
      this.append(cartItemsDiv);
    }
  }
}
