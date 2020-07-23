import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'noimage'
})
export class NoImagePipe implements PipeTransform {
  constructor() {}

  transform(image: string) {
    return image ? image : 'assets/img/noimage.png';
  }

}
