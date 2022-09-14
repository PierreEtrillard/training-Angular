import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBorderCard]'
})
export class BorderCardDirective {
private borderColorPrimary:string = '#0075FF';
private borderColorSecondary:string = '#5B005B';
private borderColorError:string = '#D22026';
  constructor(private el: ElementRef) {
    this.setHeight(180);
    this.setBorder(this.borderColorError);
  }
  @Input('appBorderCard') borderColor: string;// BorderColor: alias d'appBorderCard
  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || this.borderColorPrimary);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.borderColor || this.borderColorSecondary);
  }
  setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`;
  }
  setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px${color}`;
  }

}

