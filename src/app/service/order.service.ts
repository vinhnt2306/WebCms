import { Injectable } from '@angular/core';
import { Category } from 'src/core/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class OrderServices {
    private baseURL = 'https://localhost:44383';

    constructor(private httpClient: HttpClient) { }

    category: Category[] = [];
    getListOrder(): Observable<any> {
        const body = {
            token: JSON.parse(localStorage.getItem('currentUser') ?? "").data.token
        };
        return this.httpClient.request('POST', `${this.baseURL}/api/GetListOrderAdmin/Process`, {
            body: body,
            observe: 'body',
            responseType: 'json'
        })
    }


}
