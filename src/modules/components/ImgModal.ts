import BaseComponent from './BaseComponent';
import Button from './Button';

export default class ImgModal extends BaseComponent {
  imgs: string[];

  closeBtn: Button;

  leftBtn: Button;

  rightBtn: Button;

  mainImg: BaseComponent;

  allImgs: BaseComponent;

  constructor(imgs: string[]) {
    super({ classes: ['img-modal'] });
    this.imgs = imgs;
    this.closeBtn = new Button({ text: '', classes: ['img-modal__close-btn'] });
    this.leftBtn = new Button({ text: '', classes: ['img-modal__left-btn'] });
    this.rightBtn = new Button({ text: '', classes: ['img-modal__right-btn'] });
    this.mainImg = new BaseComponent({
      tag: 'img',
      classes: ['img-modal__main-img'],
    });
    this.mainImg.setAttribute('src', `${this.imgs[0]}`);
    this.allImgs = new BaseComponent({ classes: ['img-modal__all'] });
    const imgsComponents = imgs.map((i) => {
      const img = new BaseComponent({
        tag: 'img',
        classes: ['img-modal__all-item'],
      });
      img.setAttribute('src', i);
      return img;
    });
    this.allImgs.appendChildren(imgsComponents);

    this.appendChildren([
      this.closeBtn,
      this.leftBtn,
      this.rightBtn,
      this.mainImg,
      this.allImgs,
    ]);

    this.allImgs.addListener('click', (e) => {
      this.allImgsHandler(e);
    });

    this.closeBtn.addListener('click', () => {
      this.destroy();
    });
  }

  allImgsHandler(e: Event): void {
    if (e.target instanceof HTMLElement) {
      const img = e.target.closest('.img-modal__all-item');
      if (img) {
        const src = img.getAttribute('src');
        this.mainImg.setAttribute('src', src as string);
      }
    }
  }
}
