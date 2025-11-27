import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrinhoService, ItemCarrinho } from '../../services/carrinho.service';
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
export class Carrinho implements OnInit {

  itensCarrinho: ItemCarrinho[] = [];
  total: number = 0;

  constructor(
    private carrinhoService: CarrinhoService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.mostrarCarrinho();
  }

  ionViewWillEnter() {
    this.mostrarCarrinho();
  }

  mostrarCarrinho() {
    this.itensCarrinho = this.carrinhoService.getCarrinho();
    this.total = this.carrinhoService.getTotal();
  }

  aumentarQuantidade(id: number) {
    this.carrinhoService.incrementarQtd(id);
    this.mostrarCarrinho();
  }

  diminuirQuantidade(id: number) {
    this.carrinhoService.decrementarQtd(id);
    this.mostrarCarrinho();
  }

  removerItem(id: number) {
    this.carrinhoService.removerItem(id);
    this.mostrarCarrinho();
  }

  async checkout() {
    const alert = await this.alertController.create({
      header: 'Compra Finalizada',
      message: `Total da compra: ${this.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      buttons: ['OK']
    });

    await alert.present();

    this.carrinhoService.limparCarrinho();
    this.mostrarCarrinho();

    this.router.navigate(['/shop']);
  }

}
