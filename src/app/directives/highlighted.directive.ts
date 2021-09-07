import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appHighlighted]',
  exportAs: 'hl'
})
export class HighlightedDirective {
  @Input('appHighlighted') isHighlighted = false;

  @Output() toggleHighlight = new EventEmitter();

  // modifying css properties
  constructor(el: ElementRef) {
    el.nativeElement.style.color = 'red';
  }

  // apply classes to host element
  @HostBinding('class.highlighted') // html attribute
  get cssClasses() {
    return this.isHighlighted;
  }

  // @HostBinding('className')
  // get cssClasses() {
  //   return 'highlighted class2';
  // }

  @HostBinding('attr.disabled')
  get disabled() {  // dom property
    return true;
  }

  @HostListener('mouseover', ['$event'])
  mouseOver($event) {
    console.log($event);
    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.isHighlighted = false;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  toggle() {
    this.isHighlighted = !this.isHighlighted;
    this.toggleHighlight.emit(this.isHighlighted);
  }

}
