import BaseComponent from './BaseComponent';
import Button from './Button';

export default class CatalogPagination extends BaseComponent {
  btns: Button[] = [];

  constructor(pages: number, activeBtn: number) {
    super({ classes: ['c-pagination'] });
    for (let i = 0; i < pages; i += 1) {
      const btn = new Button({
        text: `${i + 1}`,
        classes: ['c-pagination__btn'],
      });
      if (i === activeBtn) {
        btn.addClass('active');
      }
      this.btns.push(btn);
    }
    this.appendChildren(this.btns);
    this.addListener('click', (e) => {
      this.setActive(e);
    });
  }

  setActive(e: Event): void {
    if (e.target instanceof HTMLElement) {
      const btn = e.target.closest('.c-pagination__btn');
      if (btn) {
        this.btns.forEach((b) => {
          b.removeClass('active');
        });
        btn.classList.add('active');
      }
    }
  }
}
