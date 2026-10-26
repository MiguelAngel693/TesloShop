import { Component, inject, signal } from '@angular/core';
import { ProductTable } from '@/products/components/product-table/product-table';
import { ProductService } from '@/products/services/product';
import { PaginationService } from '@/shared/components/pagination/pagination-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from '@/shared/components/pagination/pagination';

@Component({
  selector: 'app-products-admin',
  imports: [ProductTable, Pagination],
  templateUrl: './products-admin.html',
})
export class ProductsAdmin {
  productService = inject(ProductService);
  pagination = inject(PaginationService);

  productsPerPage = signal(10);

  productResource = rxResource({
    params: () => ({ page: this.pagination.currentPage() - 1, limit: this.productsPerPage() }),
    stream: ({ params }) => (
      this.productService.getProducts({ offset: (params.page) * 9, limit: params.limit })
    )
  })

  products = signal(this.productResource);

  module() {
    this.productResource.value()
  }
}
