import BaseComponent from '../components/BaseComponent';
import { Cart } from '../types/Types';

export default class CartPage extends BaseComponent {
  cartData?: Cart;

  constructor(cartData?: Cart) {
    super({});
    if (cartData) {
      this.cartData = cartData;
    }
  }
}
