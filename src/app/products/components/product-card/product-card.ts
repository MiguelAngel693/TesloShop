import { ProductElement } from '@/products/interfaces/product-response';
import { ProductService } from '@/products/services/product';
import { Component, computed, inject, input, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImagePipe } from '../../../products/pipes/product.image';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'product-card',
  imports: [RouterLink, ImagePipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  productService = inject(ProductService);

  product = input.required<ProductElement>();

  imageUrl = computed(()=>('http://localhost:3000/api/files/product/'+this.product().images[0]))

  // productEffect = effect(this.product)
}
