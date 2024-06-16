import { LineItem, ProductsResponse } from '../types/Types';
import BaseComponent from './BaseComponent';
import CatalogCard from './CatalogCard';

export default class CatalogList extends BaseComponent {
  productsData: ProductsResponse;

  products: CatalogCard[] = [];

  constructor(productsData: ProductsResponse) {
    super({ tag: 'ul', classes: ['catalog__list', 'c-list'] });
    this.productsData = productsData;
    this.createProductsCards(productsData);
  }

  createProductsCards(data: ProductsResponse): void {
    const products = data.results.map((itemData) => new CatalogCard(itemData));
    this.products = products;
    this.appendChildren(this.products);
  }

  checkIfProductInCart(cartProducts: LineItem[]): void {
    if (cartProducts.length !== 0 && this.products.length !== 0) {
      this.products.forEach((p) => {
        const isInCart = cartProducts.find((e) => e.productId === p.id);
        if (isInCart) {
          p.changeAddBtnToAddState();
        } else {
          p.resetAddBtn();
        }
      });
    } else if (this.products.length !== 0) {
      this.products.forEach((p) => {
        p.resetAddBtn();
      });
    }
  }
}
