import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { Produto, ProdutoService } from '../../services/product';
import { CarrinhoService } from '../../services/carrinho';
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

  products: Produto[] = [];
  cartItemCount = 0;
  userName = '';

  constructor(
    private productService: ProdutoService,
    private cartService: CarrinhoService,
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
    this.products = this.productService.getProdutos();
  }

  loadUserName() {
    this.userName = this.authService.getUser()?.name ?? 'Usuário';
  }

  updateCartCount() {
    this.cartItemCount = this.cartService.getTotalItems();
  }

  addToCart(product: Produto) {
    if (product.estoque > 0) {
      this.cartService.adicionarCarrinho(product);
      product.estoque--;
      this.productService.atualizarProduto(product);
      this.updateCartCount();
    }
  }

  goToCart() {
    this.router.navigate(['/carrinho']); // Ajuste conforme o path real
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
