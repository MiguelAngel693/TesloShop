import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image'
})

export class NamePipe implements PipeTransform {
  transform(url: string | string[]): string {
    if(typeof url === 'string'){
      return environment.baseUrl+url;
    }

    if(url.length > 0){
      return environment.baseUrl+url[0];
    }

    return './public/static/images/no-image.jpg';
  }
}
