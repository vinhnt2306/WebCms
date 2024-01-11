import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vouncher } from 'src/core/vouncher';

@Injectable({
  providedIn: 'root'
})
export class VouncherService {

  private baseURL = 'https://localhost:44383';

  constructor(private httpClient:HttpClient) { }

  //get product
  getListVouncher(): Observable<any> {
    let data = {
      "": "",

    }
    return this.httpClient.request('POST', `${this.baseURL}/api/GetListVoucher/Process`, {
      body: data,
      observe: 'body',
      responseType: 'json'
    })
  }
  createVouncher(vouncher : Vouncher) : Observable<any>{
    return this.httpClient.post(`${this.baseURL}/api/CreateVoucher/Process`,vouncher);
  }
  editSupplier(id : string , vouncher : any) : Observable<any>{
    return this.httpClient.post(`${this.baseURL}/api/EditSupplier/Process`,vouncher);
  }
}
