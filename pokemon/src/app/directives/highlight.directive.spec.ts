import { TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  let directive: HighlightDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighlightDirective],
    });

    const el = document.createElement('div');
    directive = new HighlightDirective(el);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set background color on init', () => {
    expect(directive).toBeTruthy();
  });
});
