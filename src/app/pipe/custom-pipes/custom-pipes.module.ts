import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoImagePipe } from '../noimage.pipe';

@NgModule({
  declarations: [NoImagePipe],
  exports: [NoImagePipe],
  imports: [
    CommonModule
  ]
})
export class CustomPipesModule { }
