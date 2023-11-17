import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: any = {};
  isLoggedIn = false;
  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.model.username, this.model.password);
    // this.authService.setLoggedIn(true);
  }
}
