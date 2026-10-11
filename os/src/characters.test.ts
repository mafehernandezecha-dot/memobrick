import { describe, expect, it } from 'vitest';
import { CHARACTERS } from './characters';

const CAST = ['Betty', 'Armando', 'Marcela', 'Patricia', 'Daniel', 'Hugo', 'Mario', 'Nicolás', 'Roberto',
  'Margarita', 'María Beatriz', 'Inesita', 'Aura María', 'Sofía', 'Bertha', 'Sandra', 'Mariana',
  'Freddy', 'Jenny', 'Efraín', 'Wilson', 'Saúl'];

describe('characters', () => {
  it('has exactly the 22 cast members with unique ids', () => {
    expect(CHARACTERS.map((c) => c.name).sort()).toEqual([...CAST].sort());
    expect(new Set(CHARACTERS.map((c) => c.id)).size).toBe(22);
  });
  it('gives every character a distinct portrait background', () => {
    expect(new Set(CHARACTERS.map((c) => c.spec.background)).size).toBe(22);
  });
});
