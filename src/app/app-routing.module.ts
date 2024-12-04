import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'main',
    loadComponent: () => import('./main-page/main-page.component').then(v => v.MainPageComponent)
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth-page/auth-page.component').then(v => v.AuthPageComponent)
  },
  {
    path: 'drug/:id',
    loadComponent: () => import('./medicine-page/medicine-page.component').then(v => v.MedicinePageComponent)
  },
  {
    path: 'catalogue',
    loadComponent: () => import('./catalogue-page/catalogue-page.component').then(v => v.CataloguePageComponent)
  },
  {
    path: 'chat',
    loadComponent: () => import('./chat-page/chat-page.component').then(v => v.ChatPageComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./product-page/product-page.component').then(v => v.ProductPageComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
