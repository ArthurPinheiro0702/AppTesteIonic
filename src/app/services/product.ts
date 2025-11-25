import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
  stock: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private products: Product[] = [
    {
      id: 1,
      name: 'ddcybcycbyeruvbyrv',
      price: 49.90,
      image: 'https://via.placeholder.com/150',
      description: 'Descrição teste.',
      stock: 10
    },
    {
      id: 2,
      name: 'Camiseta',
      price: 79.90,
      image: 'https://via.placeholder.com/150',
      description: 'Camisetaaaaaaaaa.',
      stock: 5
    }
  ];

  getProducts(): Product[] {
    return this.products; 
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  addProduct(product: Partial<Product>) {
    const newId =
      this.products.length > 0
        ? Math.max(...this.products.map(p => p.id)) + 1
        : 1;

    const normalized: Product = {
      id: newId,
      name: product.name ?? 'Novo Produto',
      price: product.price ?? 0,
      image: product.image ?? 'https://via.placeholder.com/150',
      description: product.description ?? '',
      stock: product.stock ?? 0
    };

    this.products.push(normalized);
  }

  updateProduct(updated: Product) {
    const index = this.products.findIndex(p => p.id === updated.id);
    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        ...updated,
        stock: updated.stock ?? this.products[index].stock ?? 0
      };
    }
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }
}
