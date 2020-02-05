import { ButtonCursorDirective } from './button-cursor.directive';
import { ElementRef } from '@angular/core';

describe('ButtonCursorDirective', () => {
  let el:ElementRef;
  it('should create an instance', () => {
    const directive = new ButtonCursorDirective(el);
    expect(directive).toBeTruthy();
  });
});
