import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ProdutoService } from '../../services/produto.service';
import { AlertController } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class AdminPage implements OnInit {

  produtos: any[] = [];

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.mostrarProdutos();
  }

  ionViewWillEnter() {
    this.mostrarProdutos();
  }

  mostrarProdutos() {
    this.produtos = this.produtoService.getProdutos();
  }

  logout() {
    this.router.navigate(['/login']);
  }

  addProduto() {
    this.router.navigate(['admin/product']);
  }

  editarProduto(id: number) {
  this.router.navigate(['/admin/product', id]);
  }


  async excluirProduto(id: number, name: string) {
    const alert = await this.alertController.create({
      header: 'Excluir Produto',
      message: `Tem certeza que deseja excluir ${name}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: () => {
            this.produtoService.deletarProduto(id);
            this.mostrarProdutos();
          }
        }
      ]
    });

    await alert.present();
  }

}
