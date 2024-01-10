import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from 'src/core/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = 'https://localhost:44383';

  constructor(private httpClient:HttpClient) { }

  //get product
  getListProduct(): Observable<any> {
    const data = {
      "":""

    }
    return this.httpClient.request('POST', `${this.baseURL}/api/HomePage/Process`, {
      body: data,
      observe: 'body',
      responseType: 'json'
    })
  }
  getListProductSearch(searchText: string): Observable<any> {
    const data = {
      name: searchText
    }
    return this.httpClient.request('POST', `${this.baseURL}/api/HomePage/Process`, {
      body: data,
      observe: 'body',
      responseType: 'json'
    })
  }
  //tạo mới sản phẩm
  createProduct(product : Product) : Observable<any>{
    return this.httpClient.post(`${this.baseURL}/api/CreateProduct/Process`,{...product,
      token : JSON.parse(localStorage.getItem('currentUser')??"").data.token,
      TypeImage : "1"
    });
  }
  //
  addToCart(productId: string, quantity: number,LoginType:boolean): Observable<any> {
    const body = {
      ProductId: productId,
      Quantity: quantity,
      LoginType:LoginType=false,
      token : JSON.parse(localStorage.getItem('currentUser')??"").data.token
    };
    return this.httpClient.post(`${this.baseURL}/api/AddToCart/Process`, body)
    // return this.httpClient.post(`${this.baseURL}/api/AddToCart/Process`, body);
  }

  getCartItem() : Observable<any>{
    let data = {
      token : JSON.parse(localStorage.getItem('currentUser')??"").data.token
    }
    return this.httpClient.request('POST',`${this.baseURL}/api/CartItem/Process`,
    {
      body : data,
      observe:'body',
      responseType : 'json',

    })
  }

  upLoadImage(data: FormData) {
    return this.httpClient.post(`https://api.cloudinary.com/v1_1/dnvuz3evz/image/upload`, data);
  }
}
