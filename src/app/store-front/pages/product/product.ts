import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/products/services/product'
import { NamePipe } from '../../../products/pipes/product.image';
import { ProductCarousel } from '@/products/components/product-carousel/product-carousel';

@Component({
  selector: 'app-product',
  imports: [NamePipe, ProductCarousel],
  templateUrl: './product.html',
})
export class Product {
  productService = inject(ProductService);
  activatedRoute = inject(ActivatedRoute);

  productIdSlug: string = this.activatedRoute.snapshot.params['idSlug'];


  productResource = rxResource({
    params: () => ({}),
    stream: () => {
      return this.productService.getProductByIdSlug(this.productIdSlug);
    }

  })

}
