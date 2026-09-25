import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { ProductService } from '@/products/services/product';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from '@/products/components/product-card/product-card';
import { Pagination } from '@/shared/components/pagination/pagination';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PaginationService } from '@/shared/components/pagination/pagination-service';


@Component({
  selector: 'home',
  imports: [ProductCard, Pagination],
  templateUrl: './home.html',
})
export class Home {
  productService = inject(ProductService);
  pagination = inject(PaginationService);

  productResource = rxResource({
    params: () => ({ page: this.pagination.currentPage() - 1 }),
    stream: ({ params }) => (
      this.productService.getProducts({ offset: (params.page) * 9 })
    )
  })

  products = signal(this.productResource);

  module() {
    this.productResource.value()
  }
}
