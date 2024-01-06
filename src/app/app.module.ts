import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './category/category.component';
import { SupplierComponent } from './supplier/supplier.component';
import { OrderComponent } from './order/order.component';
import { VoucherComponent } from './voucher/voucher.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { OderFollowComponent } from './oder-follow/oder-follow.component';
import { Vouncher } from 'src/core/vouncher';
import { VouncherComponent } from './vouncher/vouncher.component';
import { AccountComponent } from './account/account.component';
import { CustomerComponent } from './customer/customer.component';
import { GroupcustomerComponent } from './groupcustomer/groupcustomer.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent,
    CategoryComponent,
    SupplierComponent,
    OrderComponent,
    VoucherComponent,
    LoginComponent,
    MenuComponent,
    OderFollowComponent,
    VouncherComponent,
    AccountComponent,
    CustomerComponent,
    GroupcustomerComponent,
    UserComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
