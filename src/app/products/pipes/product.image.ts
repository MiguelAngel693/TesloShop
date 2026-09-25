import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl+'/files/product';

@Pipe({
  name: 'image'
})

export class ImagePipe implements PipeTransform {
  transform(url: string | string[]): string {
    if(typeof url === 'string'){
      return baseUrl+'/'+url;
    }

    if(url.length > 0){
      return baseUrl+'/'+url[0];
    }

    return `${baseUrl}/files/product/${url}`;
  }
}
