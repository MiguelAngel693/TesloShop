import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductResponse } from '../interfaces/product-response';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number,
  offset?: number,
  gender?: string,
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  private productsCache = new Map<string, ProductResponse>();
  private singleProductCache = new Map<string, Product>();

  getProducts(options: Options) {
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`;
    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key))
    }

    return this.http.get<ProductResponse>(`${baseUrl}/products`, {
      params: {
        offset: offset,
        limit: limit,
        gender: gender
      }
    }).pipe(
      tap(resp => console.log(resp)),
      tap(resp => this.productsCache.set(key, resp))
    )
  }

  getProductByIdSlug(slugId: string): Observable<Product> {
    if(this.singleProductCache.has(slugId))
      return of(this.singleProductCache.get(slugId)!)

    return this.http.get<Product>(`${baseUrl}/products/${slugId}`).pipe(
      tap((resp) => { console.log(resp); }),
      tap((resp) => this.singleProductCache.set(slugId, resp)),
    );
  }

}
