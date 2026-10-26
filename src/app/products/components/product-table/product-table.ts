import { Product } from '@/products/interfaces/product-response';
import { Component, input } from '@angular/core';
import { ImagePipe } from '../../pipes/product.image';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'product-table',
  imports: [ImagePipe, RouterLink, CurrencyPipe],
  templateUrl: './product-table.html',
})
export class ProductTable {
  products = input.required<Product[]>();

}
