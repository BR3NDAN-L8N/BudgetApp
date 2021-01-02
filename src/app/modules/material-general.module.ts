import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//  MATERIAL modules
import { MatSliderModule } from '@angular/material/slider';

const modules = [
    MatSliderModule
]

@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      ...modules
  ],
  exports: [
      ...modules
  ]
})

export class MaterialGeneralModule { }
