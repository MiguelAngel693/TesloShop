import { ProductService } from '@/products/services/product';
import { Component, inject } from '@angular/core';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductCard } from '@/products/components/product-card/product-card';
@Component({
  selector: 'gender',
  imports: [ProductCard],
  templateUrl: './gender.html',
})
export class Gender {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);

  productResource = rxResource({
    params: () => ({gender: this.gender()}),
    stream: ({params}) => (this.productService.getProducts({gender: params.gender}))
  });

  gender = toSignal(
    this.route.params.pipe(
      map(({ gender }) => gender)
    )
  );

}
