import BaseComponent from '../components/BaseComponent';
import CatalogFiltersSorts from '../components/CatalogFiltersSorts';
import CatalogList from '../components/CatalogList';
import CatalogProductTypes from '../components/CatalogProductsTypes';
import { ProductsResponse, SearchProductsData } from '../types/Types';

export default class CatalogPage extends BaseComponent {
  catalogList: CatalogList | null = null;

  types: CatalogProductTypes;

  query: CatalogFiltersSorts;

  constructor() {
    super({ tag: 'section', classes: ['catalog', 'container'] });
    this.types = new CatalogProductTypes();
    this.query = new CatalogFiltersSorts();
    this.append(this.types);
    this.append(this.query);
  }

  createProductsList(data: ProductsResponse): void {
    this.catalogList = new CatalogList(data);
    this.append(this.catalogList);
  }

  dispatchUpdateCatalogEvent(searchParams: SearchProductsData): void {
    const event = new CustomEvent('update-catalog', {
      bubbles: true,
      detail: searchParams,
    });
    this.getNode().dispatchEvent(event);
  }
}
