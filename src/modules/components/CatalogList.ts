import { ProductsResponse } from '../types/Types';
import BaseComponent from './BaseComponent';
import CatalogCard from './CatalogCard';

export default class CatalogList extends BaseComponent {
  productsData: ProductsResponse;

  constructor(productsData: ProductsResponse) {
    super({ tag: 'ul', classes: ['catalog__list', 'c-list'] });
    this.productsData = productsData;
    this.createProductsCards(productsData);
  }

  createProductsCards(data: ProductsResponse): void {
    const products = data.results.map((itemData) => new CatalogCard(itemData));
    this.appendChildren(products);
  }
}
