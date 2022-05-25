import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  onProductAdd = (e) => {
    this.cart.addProduct(this.products.find(item => item.id === e.detail));
  }

  onSliderChange = (e) => {
    this.productsGrid.updateFilter({
      maxSpiciness: e.detail // значение остроты из события 'slider-change'
    });
  }

  onRibbonSelect = (e) => {
    this.productsGrid.updateFilter({
      category: e.detail // категория из события 'ribbon-select'
    });
  }

  onCheckBoxChange = (e) => {
    if (e.target.id == 'nuts-checkbox') {
      this.productsGrid.updateFilter({
        noNuts: e.target.checked // новое значение чекбокса
      });
    }
    else {
      this.productsGrid.updateFilter({
        vegeterianOnly: e.target.checked // новое значение чекбокса
      });
    }
  }

  async render() {
    const main = document.querySelector('main');
    const header = document.querySelector('header');
    // Создание базовых компонент
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
    main.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    main.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    main.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    header.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);
    // Показ списка товаров
    this.products = await fetch('products.json').then((response) => response.json());
    this.productsGrid = new ProductsGrid(this.products);
    const gridHolder = main.querySelector('[data-products-grid-holder]');
    gridHolder.innerHTML = '';
    gridHolder.append(this.productsGrid.elem);
    // Фильтрация товаров после получения с сервера
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
    // Связь компонентов через события
    // slider-change
    this.stepSlider.elem.addEventListener('slider-change', this.onSliderChange);
    // product-add
    document.body.addEventListener('product-add', this.onProductAdd);
    // ribbon-select
    this.ribbonMenu.elem.addEventListener('ribbon-select', this.onRibbonSelect);
    // change
    main.querySelector('.filters').addEventListener('change', this.onCheckBoxChange);
  }
}
