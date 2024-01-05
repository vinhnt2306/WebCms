import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private authService: AuthService, private router : Router) {}

  onSubmit() {
    this.authService.login(this.model.username, this.model.password);
    this.router.navigate(['/menu']);
  }
}
