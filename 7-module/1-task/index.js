import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #elem = '';
  #ribbonInner = '';
  #leftButton = '';
  #rightButton = '';
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.#ribbonInner = this.#elem.querySelector('.ribbon__inner');
    this.#leftButton = this.#elem.querySelector('.ribbon__arrow_left');
    this.#rightButton = this.#elem.querySelector('.ribbon__arrow_right');
    this.#elem.addEventListener('click', this.pressOnRibbon);
    this.#ribbonInner.addEventListener('scroll', this.scroll);
  }

  get elem() {
    return this.#elem;
  }

  scroll = (e) => {
    const scrollLeft = this.#ribbonInner.scrollLeft;
    const scrollWidth = this.#ribbonInner.scrollWidth;
    const clientWidth = this.#ribbonInner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;
    this.#leftButton.className = (scrollLeft < 1) ? 
      'ribbon__arrow ribbon__arrow_left' :
      'ribbon__arrow ribbon__arrow_left ribbon__arrow_visible';

    this.#rightButton.className = (scrollRight < 1) ? 
      'ribbon__arrow ribbon__arrow_right' :
      'ribbon__arrow ribbon__arrow_right ribbon__arrow_visible';
  }

  pressOnRibbon = (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.closest('.ribbon__arrow_left')) {
      this.#ribbonInner.scrollBy(-350, 0);
    }
    if (target.closest('.ribbon__arrow_right')) {
      this.#ribbonInner.scrollBy(350, 0);
    }

    if (target.closest('.ribbon__item')) {
      const prevActive = this.#ribbonInner.querySelector('.ribbon__item_active');
      if (prevActive) {
        prevActive.classList.remove('ribbon__item_active');
      }
      target.classList.add('ribbon__item_active');
      target.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: target.dataset.id,
        bubbles: true
      }));
    }
  }

  render() {
    const template = `
    <div class="ribbon">
      <!--Кнопка прокрутки влево-->
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <!--Ссылки на категории-->
      <nav class="ribbon__inner">
        ${this.categories.map(item => `<a href="#" 
        ${(item.name === 'All') ? 'class="ribbon__item ribbon__item_active"' : 'class="ribbon__item"'}
        data-id=${item.id}>${item.name}</a>`).join('')}
      </nav>
      <!--Кнопка прокрутки вправо-->
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`;
    this.#elem = createElement(template);
  }

}
