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
    this.#sliderValue = this.#elem.querySelector('.slider__value');
    this.#sliderSteps = this.#elem.querySelector('.slider__steps');
    this.#sliderThumb = this.#elem.querySelector('.slider__thumb');
    this.#sliderProgress = this.#elem.querySelector('.slider__progress');
    this.#elem.addEventListener('click', this.changeSlider);
    this.#sliderThumb.ondragstart = (e) => {
      e.preventDefault();
    };
    this.#sliderThumb.addEventListener('pointerdown', this.onPointerDown);
  }

  onPointerDown = (e) => {
    e.preventDefault();
    const xOffset = this.elem.getBoundingClientRect().left;
    const width = this.#elem.offsetWidth;
    const step = parseInt(width / (this.#steps - 1));
    let closest = 0;
    let leftPercents = 0;
    
    const onPointerMove = (e) => {
      e.preventDefault();
      let actialPosition = (e.clientX - xOffset) / width;
      if (actialPosition < 0) {
        actialPosition = 0;
      }
      if (actialPosition > 1) {
        actialPosition = 1;
      }
      closest = Math.round((actialPosition * width) / step);
      leftPercents = actialPosition * 100;
      this.#sliderValue.innerHTML = closest;
      this.#sliderSteps.querySelector('.slider__step-active').classList.remove('slider__step-active');
      this.#sliderSteps.children[closest].classList.add('slider__step-active');
      this.#sliderThumb.style.left = leftPercents + '%';
      this.#sliderProgress.style.width = leftPercents + '%';
    };

    const onPointerUp = () => {
      document.removeEventListener('pointermove', onPointerMove);
      this.#elem.classList.remove('slider_dragging');
      leftPercents = String((step * closest * 100) / width) + '%';
      this.#sliderThumb.style.left = leftPercents;
      this.#sliderProgress.style.width = leftPercents;
      this.#elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: closest, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      }));
    };
    this.#elem.classList.add('slider_dragging');
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp, { once: true });
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
      <div class="slider__thumb" style="left: ${parseInt((this.#value / (this.#steps - 1)) * 100)}%;">
        <span class="slider__value">${this.#value}</span>
      </div>
      <!--Полоска слайдера-->
      <div class="slider__progress" style="width: ${parseInt((this.#value / (this.#steps - 1)) * 100)}%;"></div>
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