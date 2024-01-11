import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/core/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'https://localhost:44383';

  constructor(private httpClient:HttpClient) {}

  user : User[] = [];

  getListUser(): Observable<any> {
    let data = {
      "username":""
    }
    return this.httpClient.request('POST', `${this.baseURL}/api/GetListUser/Process`, {
      body: data,
      observe: 'body',
      responseType: 'json'
    })
  }
  //tạo mới user
  createUser(user : User) : Observable<any>{
    return this.httpClient.post(`${this.baseURL}/api/CreateCategory/Process`,{...user,
      token : JSON.parse(localStorage.getItem('currentUser')??"").data.token,
    });
  }
}
