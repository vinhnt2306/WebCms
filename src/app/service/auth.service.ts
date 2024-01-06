import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = 'https://your-api-url';

  constructor(private http: HttpClient,private router:Router) {}

  login(username: string, password: string) {
    return this.http.post('https://localhost:44383/api/Login/Process', { username, password })
      .subscribe(
        data => {
          // Lưu token vào bộ nhớ cục bộ
          localStorage.setItem('currentUser', JSON.stringify(data));
          window.location.reload();
        },
        error => {
          // Xử lý lỗi đăng nhập
        }
      );
    }
    logout(): void {
      localStorage.removeItem('currentUser');
    }
}
