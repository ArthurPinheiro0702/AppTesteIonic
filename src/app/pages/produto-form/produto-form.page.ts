import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Produto, ProdutoService } from 'src/app/services/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './produto-form.page.html',
  styleUrls: ['./produto-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ProductFormPage {

  product: Produto = {
    id: 0,
    nome: '',
    descricao: '',
    preco: 0,
    estoque: 0,
    imagem: ''
  };

  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProdutoService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (productId) {
      this.isEditMode = true;
      const existingProduct = this.productService.getProdutoById(productId);

      if (existingProduct) {
        this.product = { ...existingProduct };
      } else {
        this.showToast('Produto não encontrado!', 'danger');
        this.router.navigate(['/admin']);
      }
    }
  }

  saveProduct() {
    if (this.isEditMode) {
      this.productService.atualizarProduto(this.product);
      this.showToast('Produto atualizado com sucesso!', 'success');
    } else {
      this.productService.adicionarProduto(this.product);
      this.showToast('Produto cadastrado com sucesso!', 'success');
    }

    this.router.navigate(['/admin']);
  }

  onImageError() {
    this.showToast('Erro ao carregar imagem. Verifique a URL.', 'warning');
    this.product.imagem = '';
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }

}
