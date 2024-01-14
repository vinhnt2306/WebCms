import { Injectable } from '@angular/core';
import { Category } from 'src/core/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OrderServices {
  private baseURL = 'https://localhost:44383';

  constructor(private httpClient: HttpClient) { }

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
  
  updateStatusByAdmin(id:string,status:number): Observable<any>{
    const body = {
      id:id,
      status:status,
      token: JSON.parse(localStorage.getItem('currentUser') ?? '').data.token,
    };
    return this.httpClient.request(
      'POST',
      `${this.baseURL}/api/UpdateStatusOrder/Process`,
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
      `${this.baseURL}/api/Order/UpdateTrangThai?uid=${uId}&status=${status}&idBoss=${JSON.parse(localStorage.getItem('currentUser') ?? '').data.id}`,
      {
        responseType: 'json',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser') ?? '').data.token
            }`,
        }),
      }
    );
  }
  createOder(
    cartDetailID: any,
    paymentMenthodID: string,
    addressDeliveryId: string,
    voucherID: any
  ): Observable<any> {
    const body = {
      cartDetailID: cartDetailID,
      paymentMenthodID: paymentMenthodID,
      voucherID: voucherID,
      Token: JSON.parse(localStorage.getItem('currentUser') ?? '').data.token,
      customerName: "Nguyễn Tuấn Vinh",
      phoneNumber: "0123456789",
      description: "No comment"
    };
    return this.httpClient.post(
      `${this.baseURL}/api/CreateOrderCounter/Process`,
      body
    );
    // return this.httpClient.post(`${this.baseURL}/api/AddToCart/Process`, body);
  }

  confirmOrder(payload: any): Observable<any> {
    const body = {
      token: JSON.parse(localStorage.getItem('currentUser') ?? '').data.token,
      description: 'không comment',
      cartDetailId: payload.cartDetailId,
      totalAmountDiscount: payload.totalAmountDiscount,
      totalAmount: payload.totalAmount,
      paymentMethodId: payload.paymentMethodId,
      voucherID: payload.voucherID,
    };
    return this.httpClient.post(
      `${this.baseURL}/api/ConfirmOrderCounter/Process`,
      body
    );
    // return this.httpClient.post(`${this.baseURL}/api/AddToCart/Process`, body);
  }

  OderGNH(oderId: string): Observable<any> {
    const body = {
      orderId: oderId,
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
