import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #elem = ''
  #slides = []
  constructor(slides) {
    this.#slides = slides;
    this.render();
    this.addScroll();
    this.#elem.addEventListener('click', this.#elemClickEvent);
  }

  #elemClickEvent = (e) => {
    const button = e.target.closest('.carousel__button');
    if (button) {
      button.dispatchEvent(new CustomEvent("product-add", {
        detail: e.target.closest('.carousel__slide').dataset.id,
        bubbles: true
      }));
    }
  }

  get elem() {
    return this.#elem;
  }

  render() {
    const template = `
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${this.#slides.map(slide => `
          <div class="carousel__slide" data-id=${slide.id}>
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
          </div>`).join('')}
      </div>
    </div>`;
    this.#elem = createElement(template);
  }

  addScroll = () => {
    const carouselInner = this.#elem.querySelector('.carousel__inner');
    const arrowRight = this.#elem.querySelector('.carousel__arrow_right');
    const arrowLeft = this.#elem.querySelector('.carousel__arrow_left');
    let step = 0;
    let rightBorder = 0;

    arrowLeft.style.display = 'none';
    arrowRight.addEventListener('click', () => { 
      step = carouselInner.children[0].offsetWidth;
      rightBorder = -step * carouselInner.children.length;
      scrollCarousel(-step);
    });
    arrowLeft.addEventListener('click', () => { 
      scrollCarousel(step);
    });

    const scrollCarousel = (step) => {
      const endPoint = Number(carouselInner.style.transform.replace(/[^-\d]/g, '')) + step;
      if (endPoint <= 0 && endPoint > rightBorder) {
        carouselInner.style.transform = `translateX(${endPoint}px)`;
      }
      arrowLeft.style.display = (endPoint === 0) ? 'none' : '';
      arrowRight.style.display = (endPoint + step === rightBorder) ? 'none' : '';
    };
  }

}
