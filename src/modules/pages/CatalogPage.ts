import BaseComponent from '../components/BaseComponent';
import CatalogFiltersSorts from '../components/CatalogFiltersSorts';
import CatalogList from '../components/CatalogList';
import CatalogPagination from '../components/CatalogPagination';
import CatalogProductTypes from '../components/CatalogProductsTypes';
import {
  ProductsResponse,
  SearchProductsData,
  SearchSort,
} from '../types/Types';

export default class CatalogPage extends BaseComponent {
  catalogList: CatalogList | null = null;

  catalogPagination: CatalogPagination | null = null;

  types: CatalogProductTypes;

  query: CatalogFiltersSorts;

  typesIds: Map<string, string> = new Map();

  idsTypes: Map<string, string> = new Map();

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

    this.typesIds.forEach((v, k) => {
      this.idsTypes.set(v, k);
    });

    this.types = new CatalogProductTypes();
    this.types.all.addClass('active');
    this.query = new CatalogFiltersSorts();
    this.append(this.types);
    this.append(this.query);

    this.types.addListener('click', (e) => {
      this.typesHandler(e);
    });

    this.query.reset.addListener('click', () => {
      this.resetFilters();
      this.dispatchUpdateCatalogEvent(this.queryData);
    });

    this.query.colorFilter.addListener('change', () => {
      const value = this.query.colorFilter.getValue();
      if (value === '') {
        this.queryData.color = null;
      } else {
        this.queryData.color = value;
      }
      this.dispatchUpdateCatalogEvent(this.queryData);
    });

    this.query.sizeFilter.addListener('change', () => {
      const value = this.query.sizeFilter.getValue();
      if (value === '') {
        this.queryData.size = null;
      } else {
        this.queryData.size = value;
      }
      this.dispatchUpdateCatalogEvent(this.queryData);
    });

    this.query.sort.addListener('change', () => {
      const value = this.query.sort.getValue();
      if (value === '') {
        this.queryData.sort = null;
      } else {
        this.queryData.sort = value as SearchSort;
      }
      this.dispatchUpdateCatalogEvent(this.queryData);
    });

    this.query.search.addListener('input', () => {
      const value = this.query.search.getValue();
      if (value === '') {
        this.queryData.name = null;
        this.dispatchUpdateCatalogEvent(this.queryData);
      } else if (value.trim()) {
        this.queryData.name = value;
        this.dispatchUpdateCatalogEvent(this.queryData);
      }
    });
  }

  createProductsList(data: ProductsResponse): void {
    if (this.catalogList) {
      this.catalogList.destroy();
    }
    if (this.catalogPagination) {
      this.catalogPagination.destroy();
    }
    this.catalogList = new CatalogList(data);
    this.append(this.catalogList);
  }

  createPagination(pages: number, activeBtn: number): void {
    this.catalogPagination = new CatalogPagination(pages, activeBtn);
    this.catalogPagination.addListener('click', (e) => {
      this.paginationHandler(e);
    });
    this.append(this.catalogPagination);
  }

  paginationHandler(e: Event): void {
    if (e.target instanceof HTMLElement) {
      const btn = e.target.closest('.c-pagination__btn');
      if (btn) {
        console.log('btn');
        this.dispatchUpdateCatalogEvent(
          this.queryData,
          Number(btn.textContent) - 1,
        );
      }
    }
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

  resetFilters(): void {
    this.queryData.color = null;
    this.queryData.size = null;
    this.queryData.name = null;
    this.queryData.sort = null;
    this.queryData.price = null;

    this.query.resetState();
  }

  dispatchUpdateCatalogEvent(
    searchParams: SearchProductsData,
    page: number = 0,
  ): void {
    const event = new CustomEvent('update-catalog', {
      bubbles: true,
      detail: { searchParams, page },
    });
    this.getNode().dispatchEvent(event);
  }
}
