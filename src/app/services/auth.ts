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
    { id: '1', nome: 'Admin', user: 'admin', senha: 'admin', cargo: 'admin' },
    { id: '2', nome: 'Cliente', user: 'cliente', senha: 'user', cargo: 'user' }
  ];

  private currentUser: User | null = null;

  constructor() {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      this.currentUser = JSON.parse(saved);
    }
  }

  login(user: string, senha: string): boolean {
    const usuario = this.usuarios.find(
      u => u.user === user && u.senha === senha
    );

    if (usuario) {
      const cleanUser: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
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
}
