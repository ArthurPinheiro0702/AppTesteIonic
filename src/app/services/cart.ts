import { Injectable } from '@angular/core';
import { Product } from '../services/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cart: CartItem[] = [];

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(product: Product) {
    const item = this.cart.find(i => i.product.id === product.id);

    if (item) {
      item.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
  }

  increaseQuantity(productId: number, stock: number) {
    const item = this.cart.find(i => i.product.id === productId);
    if (item && item.quantity < stock) {
      item.quantity++;
    }
  }

  decreaseQuantity(productId: number) {
    const item = this.cart.find(i => i.product.id === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.removeItem(productId);
      }
    }
  }

  removeItem(productId: number) {
    this.cart = this.cart.filter(i => i.product.id !== productId);
  }

  clearCart() {
    this.cart = [];
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) =>
      sum + (item.product.price * item.quantity), 0);
  }

  getTotalItems(): number {
  return this.cart.reduce((total, item) => total + item.quantity, 0);
}


}
