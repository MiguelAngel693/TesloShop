import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl + '/files/product';

@Pipe({
  name: 'image'
})

export class ImagePipe implements PipeTransform {
  transform(value: string | string[]): string {
    if (value === '' || value === null)
      return './static/images/no-image.jpg';


    if (typeof value === 'string') {
      return baseUrl + '/' + value;
    }

    const image = value.at(0);

    if (!image || image === '' || image === null)
      return './static/images/no-image.jpg';


    if (value.length > 0) {
      return baseUrl + '/' + value[0];
    }

    return `${baseUrl}/files/product/${value}`;
  }
}
