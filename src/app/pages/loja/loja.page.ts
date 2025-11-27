import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { Produto, ProdutoService } from '../../services/produto.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.page.html',
  styleUrls: ['./loja.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    CurrencyPipe
  ]
})
export class LojaPage implements OnInit {

  produtos: Produto[] = [];
  carrinhoQtd = 0;
  username = '';

  constructor(
    private productService: ProdutoService,
    private cartService: CarrinhoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.mostrarProdutos();
    this.pegarNomeUsuario();
    this.atualizarCarrinho();
  }

  ionViewWillEnter() {
    this.atualizarCarrinho();
  }

  mostrarProdutos() {
    this.produtos = this.productService.getProdutos();
  }

  pegarNomeUsuario() {
    this.username = this.authService.getUser()?.name ?? 'Usuário';
  }

  atualizarCarrinho() {
    this.carrinhoQtd = this.cartService.getTotalItems();
  }


  irParaCarrinho() {
    this.router.navigate(['/carrinho']); 
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
