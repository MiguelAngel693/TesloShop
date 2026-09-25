import { ProductService } from '@/products/services/product';
import { Component, inject } from '@angular/core';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductCard } from '@/products/components/product-card/product-card';
import { Pagination } from '@/shared/components/pagination/pagination';
import { PaginationService } from '@/shared/components/pagination/pagination-service';
@Component({
  selector: 'gender',
  imports: [ProductCard, Pagination],
  templateUrl: './gender.html',
})
export class Gender {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  pagination = inject(PaginationService);


  productResource = rxResource({
    params: () => ({gender: this.gender(), page: this.pagination.currentPage() - 1 }),
    stream: ({params}) => (this.productService.getProducts({gender: params.gender, offset: params.page*9}))
  });

  gender = toSignal(
    this.route.params.pipe(
      map(({ gender }) => gender)
    )
  );

}
