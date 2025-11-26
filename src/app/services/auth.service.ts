import { Injectable } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarios = [
    { id: '1', nome: 'Admin', email: 'admin@teste.com', senha: '123', cargo: 'admin' },
    { id: '2', nome: 'Cliente', email: 'cliente@teste.com', senha: '123', cargo: 'user' }
  ];

  private currentUser: User | null = null;

  constructor() {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      this.currentUser = JSON.parse(saved);
    }
  }

  login(email: string, senha: string): boolean {
    const usuario = this.usuarios.find(
      u => u.email === email && u.senha === senha
    );

    if (usuario) {
      const cleanUser: User = {
        id: usuario.id,
        name: usuario.nome,
        email: usuario.email,
        role: usuario.cargo as 'admin' | 'user'
      };

      this.currentUser = cleanUser;
      localStorage.setItem('currentUser', JSON.stringify(cleanUser));
      return true;
    }

    return false;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  get currentUserValue(): User | null {
    return this.currentUser;
  }
}
