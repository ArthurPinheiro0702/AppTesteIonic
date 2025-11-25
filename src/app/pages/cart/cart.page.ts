import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class CartPage implements OnInit {

  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
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
    this.cartItems = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }

  increaseQuantity(id: number, stock: number) {
    this.cartService.increaseQuantity(id, stock);
    this.loadCart();
  }

  decreaseQuantity(id: number) {
    this.cartService.decreaseQuantity(id);
    this.loadCart();
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
    this.loadCart();
  }

  async checkout() {
    const alert = await this.alertController.create({
      header: 'Compra Finalizada',
      message: `Total da compra: <strong>${this.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>`,
      buttons: ['OK']
    });

    await alert.present();

    this.cartService.clearCart();
    this.loadCart();

    this.router.navigate(['/shop']);
  }

}
