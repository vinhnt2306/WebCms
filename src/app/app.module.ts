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
import { VouncherComponent } from './vouncher/vouncher.component';
import { AccountComponent } from './account/account.component';
import { CustomerComponent } from './customer/customer.component';
import { GroupcustomerComponent } from './groupcustomer/groupcustomer.component';
import { UserComponent } from './user/user.component';
import { BuyadminComponent } from './buyadmin/buyadmin.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    UserComponent,
    BuyadminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NzTableModule,
    ReactiveFormsModule,
    NzMessageModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
