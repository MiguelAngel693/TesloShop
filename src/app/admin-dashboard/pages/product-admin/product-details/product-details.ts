import { Product } from '@/products/interfaces/product-response';
import { Component, inject, input, OnInit } from '@angular/core';
import { ProductCarousel } from '@/products/components/product-carousel/product-carousel';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@/shared/utils/form-utils';
import { FormLabelError } from '@/shared/components/form-label-error/form-label-error';
import { ProductService } from '@/products/services/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-details',
  imports: [ProductCarousel, ReactiveFormsModule, FormLabelError],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  ngOnInit(): void {
    this.setFormValue(this.product())
  }
  product = input.required<Product>();
  productService = inject(ProductService);


  formBuilder = inject(FormBuilder);
  formUtils = FormUtils;
  productForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(this.formUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    gender: ['unisex', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
    tags: [''],
  });

  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(formLike as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(',') })
    // this.productForm.patchValue(formLike as any);
  }

  onSizeChange(size: string) {
    const currentSize = this.productForm.value.sizes ?? [];
    if (currentSize.includes(size))
      currentSize.splice(currentSize.indexOf(size), 1)
    else
      currentSize.push(size);

    this.productForm.patchValue({ sizes: currentSize })

  }
  sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  onSubmit() {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();
    if (!isValid) return;

    const formValue = this.productForm.value

    const productLike: Partial<Product> = {
      ... (formValue as any),
      tags: formValue.tags?.toLocaleLowerCase().split(',').map((tag) => tag.trim()) ?? [],
    }

    this.productService.updateProduct(productLike, this.product().id).subscribe(
      producto=>{
        console.log('Producto actualizado!');
      }
    );

  }

}
