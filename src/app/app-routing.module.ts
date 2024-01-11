import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { OrderComponent } from './order/order.component';
import { VoucherComponent } from './voucher/voucher.component';
import { MenuComponent } from './menu/menu.component';
import { OderFollowComponent } from './oder-follow/oder-follow.component';
import { SupplierComponent } from './supplier/supplier.component';
import { VouncherComponent } from './vouncher/vouncher.component';
import { UserComponent } from './user/user.component';
import { BuyadminComponent } from './buyadmin/buyadmin.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'product', component: ProductComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'order', component: OrderComponent },
      { path: 'order-follow', component: OderFollowComponent },
      { path: 'vouncher', component: VouncherComponent },
      { path: 'supplier', component: SupplierComponent },
      { path: 'user', component: UserComponent },
      { path: 'buyadmin', component: BuyadminComponent },

      // Thêm các routes con khác cho 'menu' ở đây
    ]
  },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
