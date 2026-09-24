import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { ProductService } from '@/products/services/product';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '@/products/components/product-card/product-card';


@Component({
  selector: 'home',
  imports: [ProductCard],
  templateUrl: './home.html',
})
export class Home{
  private productService = inject(ProductService);

  productResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => (
      this.productService.getProducts({})
    )
  })

  products = signal(this.productResource);

  module(){
    this.productResource.value()
  }
}
