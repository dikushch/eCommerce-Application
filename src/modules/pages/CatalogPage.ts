import BaseComponent from '../components/BaseComponent';
import CatalogFiltersSorts from '../components/CatalogFiltersSorts';
import CatalogList from '../components/CatalogList';
import CatalogProductTypes from '../components/CatalogProductsTypes';
import { ProductsResponse, SearchProductsData } from '../types/Types';

export default class CatalogPage extends BaseComponent {
  catalogList: CatalogList | null = null;

  types: CatalogProductTypes;

  query: CatalogFiltersSorts;

  typesIds: Map<string, string> = new Map();

  queryData: SearchProductsData = {
    color: null,
    size: null,
    price: null,
    type: null,
    name: null,
    sort: null,
  };

  constructor() {
    super({ tag: 'section', classes: ['catalog', 'container'] });

    this.typesIds.set('t-shirt', '66c7fa34-d9da-4878-adf4-b43fbd76afd7');
    this.typesIds.set('shirt', 'c3053551-ab9a-40bd-9e4b-1421bde0be20');
    this.typesIds.set('short', '79154a83-d7b5-4b3f-b294-2c9b45042368');
    this.typesIds.set('hat', '973f3761-e366-4791-bd63-23478d9426c0');
    this.typesIds.set('glasses', '4b9618e7-4f98-4ec3-9dda-8657a7371224');

    this.types = new CatalogProductTypes();
    this.types.all.addClass('active');
    this.query = new CatalogFiltersSorts();
    this.append(this.types);
    this.append(this.query);

    this.types.addListener('click', (e) => {
      this.typesHandler(e);
    });
  }

  createProductsList(data: ProductsResponse): void {
    if (this.catalogList) {
      this.catalogList.destroy();
    }
    this.catalogList = new CatalogList(data);
    this.append(this.catalogList);
  }

  typesHandler(e: Event): void {
    if (e.target instanceof HTMLElement) {
      const link = e.target.closest('.c-types__link');
      if (link instanceof HTMLElement) {
        this.types.setActiveLink(link);
        const type = link.dataset.type as string;
        if (type === '') {
          this.queryData.type = null;
        } else {
          this.queryData.type = this.typesIds.get(type) as string;
        }
        this.dispatchUpdateCatalogEvent(this.queryData);
      }
    }
  }

  dispatchUpdateCatalogEvent(searchParams: SearchProductsData): void {
    const event = new CustomEvent('update-catalog', {
      bubbles: true,
      detail: searchParams,
    });
    this.getNode().dispatchEvent(event);
  }
}
