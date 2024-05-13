import BaseComponent from '../components/BaseComponent';

export default class MainPage extends BaseComponent {
  constructor() {
    super({
      tag: 'section',
      classes: ['main'],
    });

    const imageDiv = new BaseComponent({
      tag: 'div',
      classes: ['image-container'],
    });

    const textHero = new BaseComponent({
      tag: 'h2',
      text: 'SUMMER SHOP',
      classes: ['text-hero'],
    });

    this.append(imageDiv);
    imageDiv.append(textHero);
  }
}
