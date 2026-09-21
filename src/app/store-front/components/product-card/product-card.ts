import { ProductElement } from '@/products/interfaces/product-response';
import { Product } from '@/products/services/product';
import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, computed, effect, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { delay, map } from 'rxjs';
import { NamePipe } from '../../../products/pipes/product.image';

@Component({
  selector: 'product-card',
  imports: [RouterLink, NamePipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  productService = inject(Product);

  product = input.required<ProductElement>();

  imageUrl = computed(()=>('http://localhost:3000/api/files/product/'+this.product().images[0]))

  // productEffect = effect(this.product)
}
