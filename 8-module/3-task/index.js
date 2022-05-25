export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    this.cartItems[ind].count += amount;
    if (this.cartItems[ind].count === 0) {
      this.cartItems.splice(ind, 1);
    }
    this.onProductUpdate(this.cartItems[ind]);
  }

  isEmpty() {
    return this.cartItems.length < 1;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

