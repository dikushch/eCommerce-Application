import BaseComponent from './BaseComponent';
import Button from './Button';

export default class OkMsg extends BaseComponent {
  close: Button;

  constructor(errText: string) {
    super({ classes: ['ok-msg'] });
    const msg = new BaseComponent({
      tag: 'p',
      text: errText,
      classes: ['ok-msg__text'],
    });
    this.close = new Button({ text: '', classes: ['ok-msg__close'] });

    this.append(this.close);
    this.append(msg);
    this.removeMsg();

    this.close.addListener('click', () => {
      this.destroy();
    });
  }

  removeMsg(): void {
    setTimeout(() => {
      this.destroy();
    }, 3000);
  }
}
