import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.offsetWidth !== 0 && document.body.clientWidth > 767) {
      const container = document.getElementsByClassName('container')[0];
      const {width} = this.elem.getBoundingClientRect();
      if (window.scrollY > 0) {
        const documentPosition = document.documentElement.getBoundingClientRect().right;
        let elemPosition = 20 + container.getBoundingClientRect().right;
        if (elemPosition + width >= documentPosition) {
          elemPosition = documentPosition - 10 - width;
        }
        this.elem.style.position = 'fixed';
        this.elem.style.zIndex = 5;
        this.elem.style.left = elemPosition + 'px';
      }
      else {
        this.elem.style.position = 'absolute';
        this.elem.style.zIndex = '';
        this.elem.style.left = '';
      }
    }
  }
}
