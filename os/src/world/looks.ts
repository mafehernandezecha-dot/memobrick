// The small 3D figures in the office reuse the parametric minifig builder.
// These overrides bring each one in line with the approved photo portraits
// (hair, outfit and colors changed during Stage 1).
import { characterById } from '../characters';
import type { MinifigSpec } from '../minifig/types';

type Look = Partial<Omit<MinifigSpec, 'face'>> & { face?: Partial<MinifigSpec['face']> };

const NAVY = '#1d2a4a';
const BLACK = '#161616';

export const LOOKS: Record<string, Look> = {
  armando: { hair: 'slick', hairColor: BLACK, torso: 'suit', torsoColor: NAVY, accentColor: '#14203a', shirtColor: '#f4f4f0', legsColor: '#1d2236' },
  marcela: { hair: 'bob', hairColor: BLACK, torso: 'blazer', torsoColor: '#b9a0d6', accentColor: '#b9a0d6', shirtColor: '#1b1b1d', necklace: 'gold', legsColor: '#2a2230', skirt: true, accessory: 'book', accessoryColor: '#1d1a20' },
  daniel: { hair: 'slick', hairColor: '#3b2416', torso: 'suit', torsoColor: '#f2f2ee', accentColor: '#111111', shirtColor: '#f2f2ee', pocketSquare: false, legsColor: '#1d2236', face: { smile: 'serious', brows: 'determined' } },
  // Bald: the receding piece in skin color reads as a bare head.
  hugo: { hair: 'receding', hairColor: '#F4BE38', torsoColor: '#c8e03a', accentColor: '#ff6fae', legsColor: '#c8e03a', face: { glasses3d: { shape: 'rect', color: '#ff6fae' } } },
  mario: { hair: 'wavy', hairColor: '#3b2416', torso: 'suit', torsoColor: '#6a6e75', accentColor: '#5b3a8c', shirtColor: '#1b1b1d', legsColor: '#6a6e75' },
  nicolas: { hair: 'short', hairColor: BLACK, torso: 'blazer', torsoColor: '#b88a5a', accentColor: '#b88a5a', shirtColor: '#3d7a5a', legsColor: '#6b5440', face: { glasses3d: { shape: 'rect', color: '#6b3a1e' } } },
  roberto: { hair: 'slick', hairColor: '#9aa0a6', torso: 'suit', torsoColor: NAVY, accentColor: '#2f6fd6', shirtColor: '#5b9be8', legsColor: NAVY, face: { glasses3d: { shape: 'round', color: '#c8a24a' }, wrinkles: true } },
  margarita: { hair: 'voluminous', hairColor: '#7a3e1e', torso: 'blazer', torsoColor: '#c3a6dc', accentColor: '#c3a6dc', shirtColor: '#1b1b1d', necklace: 'pearls', legsColor: '#c3a6dc', skirt: false },
  mariabeatriz: { hair: 'updo', hairColor: '#6b3a1e', torso: 'blazer', torsoColor: '#7a1f2b', accentColor: '#7a1f2b', shirtColor: '#3a1218', necklace: 'pearls', earrings: 'gold', legsColor: '#7a1f2b', skirt: false, accessory: 'briefcase', accessoryColor: '#7a1f2b' },
  inesita: { hair: 'bun', hairColor: '#c9cdd2', torso: 'cardigan', torsoColor: '#8a9ab3', accentColor: '#c9cdd2', legsColor: '#4a5468' },
  auramaria: { hair: 'longcurly', hairColor: '#b0702e', torso: 'patterned', torsoColor: '#1f9a96', accentColor: '#f08a2b', legsColor: '#1d6e70', skirt: false, accessory: 'book', accessoryColor: '#f4f4f0' },
  bertha: { hair: 'long', hairColor: '#3a241a', torso: 'blazer', torsoColor: '#f4c430', accentColor: '#f4c430', shirtColor: '#1b1b1d', necklace: 'pendant', legsColor: '#f4c430', skirt: false, accessory: 'none' },
  sandra: { hair: 'highponytail', hairColor: BLACK, torso: 'uniform', torsoColor: '#9fb0c6', accentColor: '#2a2a2a', legsColor: '#9fb0c6', face: { glasses3d: { shape: 'round', color: '#8a3a1c' } } },
  mariana: { hair: 'longcurly', hairColor: '#4a2c1a', torso: 'tshirt', torsoColor: '#a3212b', accentColor: '#a3212b', legsColor: '#22355e', skirt: false, sleeves: 'short', skin: '#b5774b', accessory: 'tarot' },
  freddy: { hair: 'sideswept', hairColor: '#4a2a1a', torso: 'vest', torsoColor: '#d8f02a', accentColor: '#d9a440', shirtColor: '#f2f2ee', legsColor: BLACK },
  jenny: { hair: 'long', hairColor: '#b0552a', torso: 'tshirt', torsoColor: '#a9adb3', accentColor: '#a9adb3', sleeves: 'short', legsColor: '#22355e', accessory: 'none' },
  efrain: { hair: 'wavy', hairColor: '#8a8f96', torso: 'suit', torsoColor: NAVY, accentColor: '#b0262a', shirtColor: '#bcd3ee', legsColor: NAVY, face: { mustache: true, glasses3d: { shape: 'rect', color: '#c8a24a' } } },
  wilson: { hair: 'guardcap', hairColor: BLACK, torso: 'vest', torsoColor: '#1b1b1d', accentColor: '#d32f2f', shirtColor: '#f2f2ee', legsColor: BLACK },
  saul: { hair: 'curly', hairColor: BLACK, torso: 'suit', torsoColor: NAVY, accentColor: '#7a1f3a', shirtColor: '#3f9a9a', legsColor: NAVY, face: { goatee: true } },
};

/** The builder spec for a character, or null when the character is unknown. */
export function specFor(character: string): MinifigSpec | null {
  const base = characterById(character)?.spec;
  if (!base) return null;
  const look = LOOKS[character] ?? {};
  return { ...base, ...look, face: { ...base.face, ...look.face } } as MinifigSpec;
}
