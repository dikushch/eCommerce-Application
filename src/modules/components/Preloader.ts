import BaseComponent from './BaseComponent';

export default class Preloader extends BaseComponent {
  constructor() {
    super({ classes: ['preload'] });
    const text = new BaseComponent({
      tag: 'p',
      text: 'Waiting for server response',
      classes: ['preload__text'],
    });
    const icon = new BaseComponent({ classes: ['preload__icon'] });
    this.append(text);
    this.append(icon);
  }
}
