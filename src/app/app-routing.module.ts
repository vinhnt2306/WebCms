import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { Category } from 'src/core/category';
import { CategoryComponent } from './category/category.component';
import { OrderComponent } from './order/order.component';
import { VoucherComponent } from './voucher/voucher.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'product', component: ProductComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'order', component: OrderComponent },
  { path: 'voucher', component: VoucherComponent },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
