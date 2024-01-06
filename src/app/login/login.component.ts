import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: any = {};
  isLoggedIn = false;
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
  if (this.authService.login(this.model.username, this.model.password)) {
    console.log('Login successful');
    this.router.navigate(['/menu']);
  } else {
    console.log('Login failed');
    alert('Đăng nhập thất bại');
  }
  }
}
