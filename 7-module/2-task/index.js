import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #elem = '';
  #modalTitle = ''
  #modalbody = '';
  #closeButton = ''

  constructor() {
    this.render();
    this.#modalTitle = this.#elem.querySelector('.modal__title');
    this.#modalbody = this.#elem.querySelector('.modal__body');
    this.#closeButton = this.#elem.querySelector('.modal__close');
  }

  setTitle(title) {
    this.#modalTitle.innerHTML = title;
  }

  setBody(body) {
    this.#modalbody.innerHTML = body.outerHTML;
  }

  escDownEvent = (e) => {
    if (e.code === 'Escape') {
      this.close();
    }
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.appendChild(this.#elem);
    document.addEventListener('keydown', this.escDownEvent);
    this.#closeButton.addEventListener('click', this.close);
  }

  close = () => {
    const modal = document.body.querySelector('.modal');
    if (modal) {
      document.body.classList.remove('is-modal-open');
      document.body.removeChild(modal);
      document.removeEventListener('keydown', this.escDownEvent);
      this.#closeButton.removeEventListener('click', this.close);
    }
  }

  render () {
    const template = `
    <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"></h3>
      </div>
      <div class="modal__body">
      </div>
    </div>
    </div>`;
    this.#elem = createElement(template);
  }
}
