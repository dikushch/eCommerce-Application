import BaseComponent from '../components/BaseComponent';
import Button from '../components/Button';
import ImgModal from '../components/ImgModal';

export default class ProductPage extends BaseComponent {
  id: string;

  name: string;

  descr: string;

  price: number;

  discount?: number;

  imgs?: string[];

  addToCartButton: Button;

  removeFromCartBtn: Button;

  constructor(
    id: string,
    name: string,
    descr: string,
    price: number,
    discount?: number,
    imgs?: string[],
  ) {
    super({
      tag: 'section',
      classes: ['product-page', 'container'],
    });
    this.id = id;
    this.name = name;
    this.descr = descr;
    this.price = price;
    this.discount = discount;
    this.imgs = imgs;

    const productContainer = new BaseComponent({
      tag: 'div',
      classes: ['product-container'],
    });

    const productName = new BaseComponent({
      tag: 'h1',
      text: this.name,
      classes: ['product-name'],
    });

    const productDescription = new BaseComponent({
      tag: 'p',
      text: this.descr,
      classes: ['product-description'],
    });

    const priceContainer = new BaseComponent({
      tag: 'div',
      classes: ['price-container'],
    });

    const formattedPrice = (price / 100).toFixed(2);
    const formattedDiscount = this.discount
      ? (this.discount / 100).toFixed(2)
      : undefined;

    const originalPrice = new BaseComponent({
      tag: 'span',
      text: `${formattedPrice}$`,
      classes: [
        'original-price',
        this.discount ? 'has-discount' : 'no-discount',
      ],
    });

    let salePrice: BaseComponent<HTMLElement> | null = null;
    let saleLabel: BaseComponent<HTMLElement> | null = null;

    if (this.discount) {
      const saleWrapper = new BaseComponent({
        tag: 'div',
        classes: ['sale-wrapper'],
      });

      saleLabel = new BaseComponent({
        tag: 'span',
        text: 'sale',
        classes: ['sale-label'],
      });

      salePrice = new BaseComponent({
        tag: 'span',
        text: `${formattedDiscount}$`,
        classes: ['sale-price'],
      });

      saleWrapper.append(saleLabel);
      saleWrapper.append(salePrice);
      priceContainer.append(saleWrapper);
    }

    priceContainer.append(originalPrice);
    productContainer.append(productName);
    productContainer.append(productDescription);
    productContainer.append(priceContainer);

    this.addToCartButton = new Button({
      text: 'add to cart',
      classes: ['add-to-cart'],
    });
    this.addToCartButton.addListener('click', () => {
      this.dispatchAddToCartEvent(this.id);
      this.showRemoveBtn();
    });

    this.removeFromCartBtn = new Button({
      text: 'remove from cart',
      classes: ['remove-from-cart', 'hide'],
    });
    this.removeFromCartBtn.addListener('click', () => {
      this.dispatchRemoveFromCartEvent(this.id);
      this.showAddBtn();
    });

    productContainer.append(this.addToCartButton);
    productContainer.append(this.removeFromCartBtn);

    this.append(productContainer);

    if (this.imgs && this.imgs.length > 0) {
      const slider = this.createSlider(this.imgs);
      this.append(slider);
    }
  }

  createSlider(imgs: string[]): BaseComponent {
    let currentIndex = 0;

    const sliderContainer = new BaseComponent({
      tag: 'div',
      classes: ['slider-container'],
    });

    const imagesContainer = new BaseComponent({
      tag: 'div',
      classes: ['images-container'],
    });

    const mainImage = new BaseComponent({
      tag: 'img',
      classes: ['main-image'],
    });
    mainImage.setAttribute('src', imgs[0]);
    mainImage.setAttribute('alt', this.name);

    mainImage.addListener('click', () => {
      this.openModal();
    });

    const previewsContainer = new BaseComponent({
      tag: 'div',
      classes: ['previews-container'],
    });

    imgs.forEach((img, index) => {
      const preview = new BaseComponent({
        tag: 'img',
        classes: ['preview'],
      });
      preview.setAttribute('src', img);
      preview.setAttribute('alt', `${this.name} preview ${index + 1}`);

      preview.addListener('click', () => {
        mainImage.setAttribute('src', img);
        currentIndex = index;
      });

      previewsContainer.append(preview);
    });

    const prevButton = new Button({
      text: '',
      classes: ['slider-button', 'prev-button'],
    });

    const nextButton = new Button({
      text: '',
      classes: ['slider-button', 'next-button'],
    });

    prevButton.addListener('click', () => {
      currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
      mainImage.addClass('fade-out');
      setTimeout(() => {
        mainImage.setAttribute('src', imgs[currentIndex]);
        mainImage.removeClass('fade-out');
        mainImage.addClass('fade-in');
        setTimeout(() => {
          mainImage.removeClass('fade-in');
        }, 50);
      }, 400);
    });

    nextButton.addListener('click', () => {
      currentIndex = (currentIndex + 1) % imgs.length;
      mainImage.addClass('fade-out');
      setTimeout(() => {
        mainImage.setAttribute('src', imgs[currentIndex]);
        mainImage.removeClass('fade-out');
        mainImage.addClass('fade-in');
        setTimeout(() => {
          mainImage.removeClass('fade-in');
        }, 50);
      }, 400);
    });

    imagesContainer.append(prevButton);
    imagesContainer.append(mainImage);
    sliderContainer.append(imagesContainer);
    imagesContainer.append(nextButton);
    sliderContainer.append(previewsContainer);

    return sliderContainer;
  }

  openModal(): void {
    const modal = new ImgModal(this.imgs as string[]);
    document.body.append(modal.getNode());
  }

  dispatchAddToCartEvent(id: string): void {
    const event = new CustomEvent('add-to-cart', {
      bubbles: true,
      detail: id,
    });
    this.getNode().dispatchEvent(event);
  }

  dispatchRemoveFromCartEvent(id: string): void {
    const event = new CustomEvent('update-cart', {
      bubbles: true,
      detail: { delProductId: id },
    });
    this.getNode().dispatchEvent(event);
  }

  showRemoveBtn(): void {
    this.removeFromCartBtn.removeClass('hide');
    this.addToCartButton.addClass('hide');
  }

  showAddBtn(): void {
    this.addToCartButton.removeClass('hide');
    this.removeFromCartBtn.addClass('hide');
  }
}
