import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductResponse } from '../interfaces/product-response';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '@/auth/interfaces/user';
import { Gender } from '@/store-front/pages/gender/gender-page';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number,
  offset?: number,
  gender?: string,
}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: '',
  tags: [],
  images: [],
  user: {} as User
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
      // tap(resp => console.log(resp)),
      tap(resp => this.productsCache.set(key, resp))
    )
  }

  getProductByIdSlug(slugId: string): Observable<Product> {
    if (slugId === 'new')
      return of(emptyProduct);

    if (this.singleProductCache.has(slugId))
      return of(this.singleProductCache.get(slugId)!)

    return this.http.get<Product>(`${baseUrl}/products/${slugId}`).pipe(
      // tap((resp) => { console.log(resp); }),
      tap((resp) => this.singleProductCache.set(slugId, resp)),
    );
  }

  updateProduct(productLike: Partial<Product>, id: string): Observable<Product> {
    return this.http.patch<Product>(`${baseUrl}/products/${id}`, productLike).pipe(
      tap((product) => { this.updateProductCache(product) })
    );
  }

  createProduct(productLike: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${baseUrl}/products`, productLike).pipe(
      tap((product) => { console.log(product); }),
      tap((product) => { this.updateProductCache(product) })
    )
  }

  updateProductCache(product: Product) {
    // Opcion: eliminar cache al actualizar un producto
    const { id } = product;
    this.singleProductCache.set(id, product);

    this.productsCache.forEach(response => {
      response.products = response.products.map((current) => current.id === id ? product : current)
    })
  }



}
