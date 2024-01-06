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

  getListCategory(): Observable<any> {
    let data = {

    }
    return this.httpClient.request('POST', `${this.baseURL}/api/GetListCategory/Process`, {
      body: data,
      observe: 'body',
      responseType: 'json'
    })
  }
  //tạo mới danh mục
  createCategory(category : Category) : Observable<any>{
    return this.httpClient.post(`${this.baseURL}/api/CreateCategory/Process`,{...category,
      token : JSON.parse(localStorage.getItem('currentUser')??"").data.token,
    });
  }
  upLoadImage(data: FormData) {
    return this.httpClient.post(`https://api.cloudinary.com/v1_1/dnvuz3evz/image/upload`, data);
  }
  

}
