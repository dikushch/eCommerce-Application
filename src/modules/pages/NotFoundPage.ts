import BaseComponent from '../components/BaseComponent';

export default class NotFoundPage extends BaseComponent {
  goMain: BaseComponent;

  constructor() {
    super({ tag: 'section', classes: ['nf'] });
    const text = new BaseComponent({
      tag: 'p',
      text: 'PAGE NOT FOUND',
      classes: ['nf__text'],
    });
    this.goMain = new BaseComponent({
      tag: 'a',
      text: 'main page',
      classes: ['nf__link'],
    });

    this.append(text);
    this.append(this.goMain);
  }
}
