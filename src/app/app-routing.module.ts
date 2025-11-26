import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule)
  },

  {
    path: 'shop',
    loadComponent: () =>
      import('./pages/shop/shop.page').then(m => m.ShopPage),
    canActivate: [authGuard]
  },

  {
    path: 'carrinho',
    loadComponent: () =>
      import('./pages/carrinho/carrinho.page').then(m => m.Carrinho),
    canActivate: [authGuard]
  },

  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin.page').then(m => m.AdminPage),
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'admin/product/:id',
    loadComponent: () =>
      import('./pages/produto-form/produto-form.page').then(m => m.ProductFormPage),
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'admin/product',
    loadComponent: () =>
      import('./pages/produto-form/produto-form.page').then(m => m.ProductFormPage),
    canActivate: [authGuard, adminGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
