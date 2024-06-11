import { LineItem } from '../types/Types';
import BaseComponent from './BaseComponent';
import Button from './Button';

export default class CartProductBlock extends BaseComponent {
  minusOneBtn: Button;

  plusOneBtn: Button;

  removeBtn: Button;

  constructor(item: LineItem) {
    super({ classes: ['cart_item'] });
    const cartImgNameDiv = new BaseComponent({
      classes: ['cart_item-info_container'],
    });

    const imgItem = new BaseComponent({
      classes: ['cart_item-img_wrapper'],
      tag: 'img',
    });
    imgItem.setAttribute('src', `${item.variant.images[0].url}`);

    const nameItem = new BaseComponent({
      classes: ['cart_item-h2'],
      tag: 'h3',
      text: item.name['en-US'],
    });

    cartImgNameDiv.appendChildren([imgItem, nameItem]);

    let currentPrice;
    if (item.price.discounted) {
      currentPrice = item.price.discounted.value.centAmount;
    } else {
      currentPrice = item.price.value.centAmount;
    }

    // second div
    const cartPriceControlDiv = new BaseComponent(
      {
        classes: ['cart_item-info_container'],
      },

      // price for one
      new BaseComponent({
        classes: ['cart_item-price'],
        tag: 'p',
        text: `price: ${(currentPrice / 100).toFixed(2)}$`,
      }),

      // minus and plus btns
      new BaseComponent(
        {
          classes: ['cart_item-btns_container'],
        },
        (this.minusOneBtn = new Button({
          text: '-',
          classes: ['cart_item-btn'],
        })),
        // count
        new BaseComponent({
          classes: ['cart_item-p'],
          tag: 'p',
          text: `${item.quantity}`,
        }),

        (this.plusOneBtn = new Button({
          text: '+',
          classes: ['cart_item-btn'],
        })),
      ),

      // total price
      new BaseComponent({
        classes: ['cart_item-price'],
        tag: 'p',
        text: `total: ${(item.totalPrice.centAmount / 100).toFixed(2)}$`,
      }),

      // remove btn
      (this.removeBtn = new Button({
        text: 'remove',
        classes: ['cart_item-btn', 'red'],
      })),
    );

    // add listeners
    this.minusOneBtn.addListener('click', () => {
      console.log('click minus');
    });
    this.plusOneBtn.addListener('click', () => {
      console.log('click plus');
    });
    this.removeBtn.addListener('click', () => {
      console.log('click remove');
    });

    this.append(cartImgNameDiv);
    this.append(cartPriceControlDiv);
  }
}
