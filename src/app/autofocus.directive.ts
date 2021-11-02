import { AfterViewInit, Directive, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

  @ViewChild('searchInput') element: ElementRef;

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2) { }

  ngAfterViewInit(): void {

    this.renderer.selectRootElement(this.elementRef.nativeElement).focus();
    window.setTimeout(() => {
            this.elementRef.nativeElement.focus();
        });
    this.renderer.selectRootElement(this.element.nativeElement).focus();
    window.setTimeout(() => {
      
      this.element.nativeElement.focus();
  });
  }

}
