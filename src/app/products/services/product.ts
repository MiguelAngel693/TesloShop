import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductResponse } from '../interfaces/product-response';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number,
  offset?: number,
  gender?: string,
}

@Injectable({ providedIn: 'root' })
export class Product {
  constructor() { }

  private http = inject(HttpClient);

  getProducts(options: Options) {

    const { limit = 9, offset = 0, gender = '' } = options;

    return this.http.get<ProductResponse>(`${baseUrl}/products`, {
      params: {
        offset: offset,
        limit: limit,
        gender: gender
      }
    }).pipe(
      tap(resp => console.log(resp)),
      map((resp) => resp.products)
    )
  }

}
