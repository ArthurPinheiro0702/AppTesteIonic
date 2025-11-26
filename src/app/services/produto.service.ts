import { Injectable } from '@angular/core';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem?: string;
  descricao?: string;
  estoque: number;
}

@Injectable({
  providedIn: 'root',
})

export class ProdutoService {

  private produtos: Produto[] = [
    {
      id: 1,
      nome: 'ddcybcycbyeruvbyrv',
      preco: 49.90,
      imagem: 'https://via.placeholder.com/150',
      descricao: 'Descrição teste.',
      estoque: 10
    },
    {
      id: 2,
      nome: 'Camiseta',
      preco: 79.90,
      imagem: 'https://via.placeholder.com/150',
      descricao: 'Camisetaaaaaaaaa.',
      estoque: 5
    }
  ];

  getProdutos(): Produto[] {
    return this.produtos; 
  }

  getProdutoById(id: number): Produto | undefined {
    return this.produtos.find(p => p.id === id);
  }

  adicionarProduto(p: Partial<Produto>) {
    const novoId =
      this.produtos.length > 0
        ? Math.max(...this.produtos.map(p => p.id)) + 1
        : 1;

    const novoProduto: Produto = {
      id: novoId,
      nome: p.nome ?? 'Novo Produto',
      preco: p.preco ?? 0,
      imagem: p.imagem ?? 'https://via.placeholder.com/150',
      descricao: p.descricao ?? '',
      estoque: p.estoque ?? 0
    };

    this.produtos.push(novoProduto);
  }

  atualizarProduto(prodAtualizado: Produto) {
    const index = this.produtos.findIndex(p => p.id === prodAtualizado.id);
    if (index !== -1) {
      this.produtos[index] = {
        ...this.produtos[index],
        ...prodAtualizado,
        estoque: prodAtualizado.estoque ?? this.produtos[index].estoque ?? 0
      };
    }
  }

  deletarProduto(id: number) {
    this.produtos = this.produtos.filter(p => p.id !== id);
  }
}
