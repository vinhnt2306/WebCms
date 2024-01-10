import { Injectable } from '@angular/core';
import { Category } from 'src/core/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OrderServices {
  private baseURL = 'https://localhost:44383';

  constructor(private httpClient: HttpClient) {}

  category: Category[] = [];
  getListOrder(): Observable<any> {
    const body = {
      token: JSON.parse(localStorage.getItem('currentUser') ?? '').data.token,
    };
    return this.httpClient.request(
      'POST',
      `${this.baseURL}/api/GetListOrderAdmin/Process`,
      {
        body: body,
        observe: 'body',
        responseType: 'json',
      }
    );
  }

  updateStatus(uId: string, status: number, idBoss: string): Observable<any> {
    const body = {
      token: JSON.parse(localStorage.getItem('currentUser') ?? '').data.token,
    };
    return this.httpClient.request(
      'PUT',
      `${this.baseURL}/api/Order/UpdateTrangThai?uid=${uId}&status=${status}&idBoss=${idBoss}`,
      {
        responseType: 'json',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('currentUser') ?? '').data.token
          }`,
        }),
      }
    );
  }
  OderGNH(oderId:string,serviceId:any): Observable<any> {
    const body = {
      OderId : oderId,
      ServiceId: serviceId,
      token: JSON.parse(localStorage.getItem('currentUser') ?? '').data.token,
    };
    return this.httpClient.request(
      'POST',
      `${this.baseURL}/api/CreateOrderGHN/Process`,
      {
        body: body,
        observe: 'body',
        responseType: 'json',
      }
    );
  }
}
