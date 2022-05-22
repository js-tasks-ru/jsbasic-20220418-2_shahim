import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #elem = '';
  #steps = '';
  #value = '';
  #sliderValue = '';
  #sliderSteps = '';
  #sliderThumb = '';
  #sliderProgress = '';
  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.render();
    this.#elem.addEventListener('click', this.changeSlider);
    this.#sliderValue = this.#elem.querySelector('.slider__value');
    this.#sliderSteps = this.#elem.querySelector('.slider__steps');
    this.#sliderThumb = this.#elem.querySelector('.slider__thumb');
    this.#sliderProgress = this.#elem.querySelector('.slider__progress');
  }

  changeSlider = (e) => {
    const {x, width} = this.#elem.getBoundingClientRect();
    const step = parseInt(width / (this.#steps - 1));
    const actialPosition = e.clientX - x;
    const closest = Math.round(actialPosition / step);
    const leftPercents = String((step * closest * 100) / width) + '%';
    this.#sliderValue.innerHTML = closest;
    this.#sliderSteps.querySelector('.slider__step-active').classList.remove('slider__step-active');
    this.#sliderSteps.children[closest].classList.add('slider__step-active');
    this.#sliderThumb.style.left = leftPercents;
    this.#sliderProgress.style.width = leftPercents;
    this.#elem.dispatchEvent(new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: closest, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    }));
  }

  get elem() {
    return this.#elem;
  }

  render() {
    const template = `
    <!--Корневой элемент слайдера-->
    <div class="slider">
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb">
        <span class="slider__value">${this.#value}</span>
      </div>
      <!--Полоска слайдера-->
      <div class="slider__progress" style="width: 0%;"></div>
      <!-- Шаги слайдера (вертикальные чёрточки) -->
      <div class="slider__steps">
        <!-- текущий выбранный шаг выделен этим классом -->
        ${Array.from(Array(this.#steps).keys()).map(i => {
          return (i === 0) ? `<span class="slider__step-active"></span>` : `<span></span>`;
        }).join('')}
      </div>
    </div>`;
    this.#elem = createElement(template);
  }
}
