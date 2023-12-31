import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from 'src/core/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private baseURL = 'https://localhost:44383';

  constructor(private httpClient:HttpClient) {}

  supplier : Supplier[] = [];
  getSupplier(): Observable<any> {
    let data = {

    }
    return this.httpClient.request('POST', `${this.baseURL}/api/GetListSupplier/Process`, {
      body: data,
      observe: 'body',
      responseType: 'json'
    })
  }
  createSupplier(supplier : Supplier) : Observable<any>{
    return this.httpClient.post(`${this.baseURL}/api/CreateSupplier/Process`,supplier);
  }
  editSupplier(id : string , supplier : any) : Observable<any>{
    return this.httpClient.post(`${this.baseURL}/api/EditSupplier/Process`,supplier);
  }
}
