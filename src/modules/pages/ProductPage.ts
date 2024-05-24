import BaseComponent from '../components/BaseComponent';

export default class ProductPage extends BaseComponent {
  name: string;

  descr: string;

  price: number;

  discount?: number;

  constructor(name: string, descr: string, price: number, discount?: number) {
    super({});
    this.name = name;
    this.descr = descr;
    this.price = price;
    if (discount) {
      this.discount = discount;
    }
  }
}
