import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { Product, ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    CurrencyPipe
  ]
})
export class ShopPage implements OnInit {

  products: Product[] = [];
  cartItemCount = 0;
  userName = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadUserName();
    this.updateCartCount();
  }

  ionViewWillEnter() {
    this.updateCartCount();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  loadUserName() {
    this.userName = this.authService.currentUserValue?.name ?? 'Usuário';
  }

  updateCartCount() {
    this.cartItemCount = this.cartService.getTotalItems();
  }

  addToCart(product: Product) {
    if (product.stock > 0) {
      this.cartService.addToCart(product);
      product.stock--;
      this.productService.updateProduct(product);
      this.updateCartCount();
    }
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
