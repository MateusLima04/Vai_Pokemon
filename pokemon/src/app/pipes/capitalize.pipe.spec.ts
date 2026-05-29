import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  it('should create an instance', () => {
    const pipe = new CapitalizePipe();
    expect(pipe).toBeTruthy();
  });

  it('should capitalize the first letter', () => {
    const pipe = new CapitalizePipe();
    expect(pipe.transform('hello')).toBe('Hello');
  });

  it('should convert rest to lowercase', () => {
    const pipe = new CapitalizePipe();
    expect(pipe.transform('HELLO')).toBe('Hello');
  });

  it('should handle empty string', () => {
    const pipe = new CapitalizePipe();
    expect(pipe.transform('')).toBe('');
  });

  it('should handle single character', () => {
    const pipe = new CapitalizePipe();
    expect(pipe.transform('a')).toBe('A');
  });
});
