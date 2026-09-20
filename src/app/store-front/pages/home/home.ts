import { AfterViewInit, Component, inject } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { Product } from '@/products/services/product';
import { rxResource } from '@angular/core/rxjs-interop';


@Component({
  selector: 'home',
  imports: [ProductCard],
  templateUrl: './home.html',
})
export class Home implements AfterViewInit{
  private productService = inject(Product);

  ngAfterViewInit(){
    console.log('214');

  }

  productResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => (
      this.productService.getProducts()
    )

  })

}
