import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  #productInfo = {}
  #elem = ''
  #button = ''
  constructor(product) {
    this.#productInfo = product;
    this.render();
    this.#button = this.#elem.querySelector('.card__button');
    this.#button.addEventListener('click', this.onButtonClick);
  }

  onButtonClick = () => {
    const event = new CustomEvent("product-add", {
      detail: this.#productInfo.id,
      bubbles: true 
    });
    this.#button.dispatchEvent(event);
  }

  get elem() {
    return this.#elem;
  }

  render() {
    const template = `
    <div class="card" id=${this.#productInfo.id}>
    <div class="card__top">
        <img src="/assets/images/products/${this.#productInfo.image}" class="card__image" alt="product">
        <span class="card__price">€${this.#productInfo.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
        <div class="card__title">${this.#productInfo.name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
    </div>`;
    this.#elem = createElement(template);
  }
}