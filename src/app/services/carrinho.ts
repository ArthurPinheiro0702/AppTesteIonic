import { Injectable } from '@angular/core';
import { Produto } from './product';

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {

  private carrinho: ItemCarrinho[] = [];

  getCarrinho(): ItemCarrinho[] {
    return this.carrinho;
  }

  adicionarCarrinho(produto: Produto) {
    const item = this.carrinho.find(i => i.produto.id === produto.id);

    if (item) {
      item.quantidade++;
    } else {
      this.carrinho.push({ produto, quantidade: 1 });
    }
  }

  incrementarQtd(idProd: number, estoque: number) {
    const item = this.carrinho.find(i => i.produto.id === idProd);
    if (item && item.quantidade < estoque) {
      item.quantidade++;
    }
  }

  decrementarQtd(idProd: number) {
    const item = this.carrinho.find(i => i.produto.id === idProd);
    if (item) {
      if (item.quantidade > 1) {
        item.quantidade--;
      } else {
        this.removerItem(idProd);
      }
    }
  }

  removerItem(idProd: number) {
    this.carrinho = this.carrinho.filter(i => i.produto.id !== idProd);
  }

  limparCarrinho() {
    this.carrinho = [];
  }

  getTotal(): number {
  let total = 0;

  for (let item of this.carrinho) {
    total += item.produto.preco * item.quantidade;
  }

  return total;
  }


  getTotalItems(): number {
  let total = 0;

  for (let item of this.carrinho) {
    total += item.quantidade;
  }

  return total;
}

}
