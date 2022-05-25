import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  #elem = '';
  #prevFilters = {};
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  get elem() {
    return this.#elem;
  }

  render() {
    const template = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
        <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
      </div>
    </div>`);
    template.querySelector('.products-grid__inner').append(...this.products.map(item => {
      const productCard = new ProductCard(item);
      return productCard.elem;
    }));
    this.#elem = template;
  }

  filtrator = (product, properties) => {
    return Object.keys(properties).reduce((result, key) => {
      if (!properties[key]) {
        return result;
      }
      if (key === 'noNuts') {
        if (product.nuts) {
          result = false;
          return result;
        }
      }
      if (key === 'vegeterianOnly') {
        if (!product.vegeterian) {
          result = false;
          return result;
        }
      }
      if (key === 'category') {
        if (product.category !== properties[key]) {
          result = false;
          return result;
        }
      } 
      if (key === 'maxSpiciness') {
        if (product.spiciness > properties[key]) {
          result = false;
          return result;
        }
      }
      return result;
    }, true);
  }

  updateFilter(filters) {
    // дополняем критериями фильтрации после предыдущего вызова
    let properties = Object.assign(this.#prevFilters, filters); 
    const filteredProducts = this.products.filter(product => this.filtrator(product, properties));
    this.#elem.querySelector('.products-grid__inner').innerHTML = '';
    this.#elem.querySelector('.products-grid__inner').append(...filteredProducts.map(item => {
      const productCard = new ProductCard(item);
      return productCard.elem;
    }));
    // запоминаем критерии фильрации
    this.#prevFilters = properties;
  }

}
