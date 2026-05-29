import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  // Verifica se a instância do pipe é criada corretamente
  it('should create an instance', () => {
    const pipe = new CapitalizePipe();
    expect(pipe).toBeTruthy();
  });

  // Verifica se a primeira letra é convertida para maiúscula
  it('should capitalize the first letter', () => {
    const pipe = new CapitalizePipe();
    expect(pipe.transform('hello')).toBe('Hello');
  });

  // Verifica se as letras restantes são convertidas para minúsculas
  it('should convert rest to lowercase', () => {
    const pipe = new CapitalizePipe();
    expect(pipe.transform('HELLO')).toBe('Hello');
  });

  // Verifica se a função trata strings vazias corretamente
  it('should handle empty string', () => {
    const pipe = new CapitalizePipe();
    expect(pipe.transform('')).toBe('');
  });

  // Verifica se a função trata um único caractere corretamente
  it('should handle single character', () => {
    const pipe = new CapitalizePipe();
    expect(pipe.transform('a')).toBe('A');
  });
});
