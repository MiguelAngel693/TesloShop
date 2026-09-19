import { Component } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'home',
  imports: [ProductCard],
  templateUrl: './home.html',
})
export class Home {}
