import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { Category } from 'src/core/category';
import { CategoryComponent } from './category/category.component';
import { SupplierComponent } from './supplier/supplier.component';
import { MenuComponent } from './menu/menu.component';
import { Vouncher } from 'src/core/vouncher';
import { VouncherComponent } from './vouncher/vouncher.component';

const routes: Routes = [
  
  { path:'login', component: LoginComponent },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      { path:'home', component: HomeComponent },
      { path:'product', component: ProductComponent },
      { path:'category', component: CategoryComponent },
      { path:'supplier', component: SupplierComponent },
      // Thêm các routes con khác cho 'menu' ở đây
    ]
  },
  { path:'vouncher', component: VouncherComponent },
  { path: '**', redirectTo: 'menu'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
