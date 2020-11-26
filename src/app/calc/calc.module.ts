import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameComponent } from './frame/frame.component';
import { ScreenComponent } from './screen/screen.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [FrameComponent, ScreenComponent, ButtonComponent],
  imports: [CommonModule],
  exports: [FrameComponent, ScreenComponent]
})
export class CalcModule {}
