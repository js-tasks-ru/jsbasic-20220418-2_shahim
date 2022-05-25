import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modalWindow = '';
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    const productId = product?.id;
    if (productId) {
      const ind = this.cartItems.findIndex(item => item.product.id === productId);
      if (ind === -1) {
        const cartItem = { 
          product: product,
          count: 1
        };
        this.cartItems.push(cartItem);
        this.onProductUpdate(cartItem);
      } else {
        this.cartItems[ind].count += 1;
        this.onProductUpdate(this.cartItems[ind]);
      }
    }
  }

  updateProductCount(productId, amount) {
    const ind = this.cartItems.findIndex(item => item.product.id === productId);
    if (ind !== -1) {
      this.cartItems[ind].count += amount;
      this.onProductUpdate(this.cartItems[ind]);
      if (this.cartItems[ind].count === 0) {
        this.cartItems.splice(ind, 1);
      }
    }
  }

  isEmpty() {
    return this.cartItems.length < 1 || (this.cartItems.length == 1 && this.cartItems[0].count === 0);
  }

  getTotalCount() {
    return this.cartItems.reduce((acc, item) => {
      acc += item.count;
      return acc;
    }, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((acc, item) => {
      acc += item.product.price * item.count;
      return acc;
    }, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  clickOnForm = (e) => {
    const button = e.target.closest('.cart-counter__button');
    if (button) {
      const productId = e.target.closest('.cart-product').dataset.productId;
      if (button.classList.contains('cart-counter__button_minus')) {
        this.updateProductCount(productId, -1);
      } 
      else {
        this.updateProductCount(productId, 1);
      }
    }
  }

  renderModal() {
    this.modalWindow = new Modal();
    this.modalWindow.setTitle("Your order");
    const basket = createElement('<div></div>');
    const form = this.renderOrderForm();
    basket.append(...this.cartItems.map(item => this.renderProduct(item.product, item.count)), form);
    this.modalWindow.setBody(basket);
    this.modalWindow.open();
    document.querySelector('.modal__body').addEventListener('click', this.clickOnForm);
    document.querySelector('.cart-form').addEventListener('submit', this.onSubmit);
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    const modalWindow = document.querySelector('.modal__body');
    if (modalWindow) {
      const product = modalWindow.querySelector('[data-product-id="' + cartItem.product.id + '"]');
      product.querySelector('.cart-counter__count').innerHTML = cartItem.count;
      product.querySelector('.cart-product__price').innerHTML = '€' + (cartItem.product.price * cartItem.count).toFixed(2);
      modalWindow.querySelector('.cart-buttons__info-price').innerHTML = '€' + this.getTotalPrice().toFixed(2);
      if (cartItem.count == 0) {
        product.remove();
        if (modalWindow.childNodes[0].children.length < 2) {
          this.modalWindow.close();
        }
      }
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    const submitButton = document.querySelector('.modal__body button[type=submit]');
    submitButton.classList.add('is-loading');
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(document.querySelector('.cart-form'))
    })
    .then(responce => {
      this.modalWindow.setTitle("Success!");
      this.modalWindow.setBody(createElement(`
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>`));
      this.cartItems = [];
      this.cartIcon.update(this);
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

