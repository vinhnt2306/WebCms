import { Injectable } from '@angular/core';
import { Category } from 'src/core/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartegoryService {
  private baseURL = 'https://localhost:44383';

  constructor(private httpClient:HttpClient) {}

  category : Category[] = [];
  getCategory(): Observable<any> {
    let data = {

    }
    return this.httpClient.request('POST', `${this.baseURL}/api/GetListCategory/Process`, {
      body: data,
      observe: 'body',
      responseType: 'json'
    })
  }


}
