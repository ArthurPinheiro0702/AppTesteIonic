import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product';  // ajuste se o caminho for diferente
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

  products: any[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  ionViewWillEnter() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  logout() {
    this.router.navigate(['/login']);
  }

  addProduct() {
    this.router.navigate(['admin/product']);
  }

  editProduct(id: number) {
  this.router.navigate(['/admin/product', id]);
  }


  async deleteProduct(id: number, name: string) {
    const alert = await this.alertController.create({
      header: 'Excluir Produto',
      message: `Tem certeza que deseja excluir <strong>${name}</strong>?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: () => {
            this.productService.deleteProduct(id);
            this.loadProducts();
          }
        }
      ]
    });

    await alert.present();
  }

}
