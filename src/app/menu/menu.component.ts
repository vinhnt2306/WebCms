import { Component,OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  userName: string | undefined;
  isLoggedIn = false;
  constructor(private authService : AuthService, private router: Router){

  }
  ngOnInit(){
    //check đăng nhập
    if(localStorage.getItem('currentUser')){
      this.isLoggedIn=true;
    }else{
      this.isLoggedIn=false;
    }
    //hiển thị user
    // Lấy dữ liệu từ localStorage
    const currentUserData = localStorage.getItem('currentUser');
    // Kiểm tra xem dữ liệu có tồn tại hay không
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData);
      this.userName = currentUser.data.userName;
      // Thực hiện các xử lý với dữ liệu người dùng
    }
  }
  logout(): void {
    this.authService.logout();
  }
}
