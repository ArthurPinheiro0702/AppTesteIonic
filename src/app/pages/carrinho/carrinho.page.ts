import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrinhoService, ItemCarrinho } from '../../services/carrinho';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class CartPage implements OnInit {

  cartItems: ItemCarrinho[] = [];
  total: number = 0;

  constructor(
    private cartService: CarrinhoService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  ionViewWillEnter() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCarrinho();
    this.total = this.cartService.getTotal();
  }

  increaseQuantity(id: number, stock: number) {
    this.cartService.incrementarQtd(id, stock);
    this.loadCart();
  }

  decreaseQuantity(id: number) {
    this.cartService.decrementarQtd(id);
    this.loadCart();
  }

  removeItem(id: number) {
    this.cartService.removerItem(id);
    this.loadCart();
  }

  async checkout() {
    const alert = await this.alertController.create({
      header: 'Compra Finalizada',
      message: `Total da compra: <strong>${this.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>`,
      buttons: ['OK']
    });

    await alert.present();

    this.cartService.limparCarrinho();
    this.loadCart();

    this.router.navigate(['/shop']);
  }

}
