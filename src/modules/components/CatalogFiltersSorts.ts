import BaseComponent from './BaseComponent';
import Button from './Button';
import Input from './Input';
import Select from './Select';

export default class CatalogFiltersSorts extends BaseComponent {
  colorFilter: Select;

  sizeFilter: Select;

  sort: Select;

  search: Input;

  reset: Button;

  constructor() {
    super({ classes: ['query'] });
    const colorFilterTitle = new BaseComponent({
      tag: 'p',
      text: 'color:',
      classes: ['query__filter-name'],
    });
    this.colorFilter = new Select(
      [
        { value: '', text: '-' },
        { value: 'white', text: 'white' },
        { value: 'black', text: 'black' },
        { value: 'green', text: 'green' },
        { value: 'red', text: 'red' },
      ],
      { classes: ['query__filter-select'] },
    );
    const colorBox = new BaseComponent(
      { classes: ['query__filter-box'] },
      colorFilterTitle,
      this.colorFilter,
    );

    const sizeFilterTitle = new BaseComponent({
      tag: 'p',
      text: 'size:',
      classes: ['query__filter-name'],
    });
    this.sizeFilter = new Select(
      [
        { value: '', text: '-' },
        { value: 's', text: 's' },
        { value: 'm', text: 'm' },
        { value: 'l', text: 'l' },
      ],
      { classes: ['query__filter-select'] },
    );
    const sizeBox = new BaseComponent(
      { classes: ['query__filter-box'] },
      sizeFilterTitle,
      this.sizeFilter,
    );

    const filtersContainer = new BaseComponent(
      { classes: ['query__filters'] },
      colorBox,
      sizeBox,
    );

    const sortTitle = new BaseComponent({
      tag: 'p',
      text: 'sort:',
      classes: ['query__filter-name'],
    });
    this.sort = new Select(
      [
        { value: '', text: '-' },
        { value: 'name.en-US asc', text: 'by name A-Z' },
        { value: 'name.en-US desc', text: 'by name Z-A' },
        { value: 'price asc', text: 'by price low-high' },
        { value: 'price desc', text: 'by price high-low' },
      ],
      { classes: ['query__filter-select'] },
    );
    const sortContainer = new BaseComponent(
      { classes: ['query__filter-box'] },
      sortTitle,
      this.sort,
    );

    const searchTitle = new BaseComponent({
      tag: 'p',
      text: 'search:',
      classes: ['query__filter-name'],
    });
    this.search = new Input({ type: 'text', classes: ['query__search'] });
    this.search.setAttribute('placeholder', 'type to find...');
    const searchContainer = new BaseComponent(
      { classes: ['query__search-box'] },
      searchTitle,
      this.search,
    );

    this.reset = new Button({ text: 'reset', classes: ['query__reset-btn'] });

    this.appendChildren([
      filtersContainer,
      sortContainer,
      searchContainer,
      this.reset,
    ]);
  }
}
