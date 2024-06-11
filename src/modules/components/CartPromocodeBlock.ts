import BaseComponent from './BaseComponent';
import Button from './Button';
import Input from './Input';

export default class CartPromocodeBlock extends BaseComponent {
  promocodeInput: Input;

  sendPromocodeBtn: Button;

  constructor() {
    super({ classes: ['cart_promocode'] });

    const promocodeTitle = new BaseComponent({
      classes: ['cart_promocode-h3'],
      tag: 'h3',
      text: 'Promocode:',
    });

    // add on page
    this.append(promocodeTitle);
    this.append(
      (this.promocodeInput = new Input({
        type: 'text',
        classes: ['cart_promocode-input'],
      })),
    );
    this.append(
      (this.sendPromocodeBtn = new Button({
        text: 'apply',
        classes: ['cart_promocode-btn', 'green'],
      })),
    );
    this.sendPromocodeBtn.disable();

    // add listeners
    this.promocodeInput.addListener('input', () => {
      if (this.promocodeInput.getValue().trim().length !== 0) {
        this.sendPromocodeBtn.enable();
        return;
      }
      this.sendPromocodeBtn.disable();
    });
    this.sendPromocodeBtn.addListener('click', () => {
      console.log('send promocode !!');
    });
  }
}