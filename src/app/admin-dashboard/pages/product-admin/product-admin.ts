import { ProductService } from '@/products/services/product';
import { PaginationService } from '@/shared/components/pagination/pagination-service';
import { Component, effect, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductDetails } from './product-details/product-details';

@Component({
  selector: 'app-product-admin',
  imports: [ProductDetails],
  templateUrl: './product-admin.html',
})
export class ProductAdmin {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);

  productId = toSignal(this.activatedRoute.params.pipe(map((params) => params['id'])));

  productResource = rxResource({
    // params: () => ({}),
    stream: () => (
      this.productService.getProductByIdSlug(this.productId())
    )
  })

  redirectEffect = effect(() => {
    if (this.productResource.error())
      this.router.navigate(['/admin/products'])
  })

  product = signal(this.productResource);

}
