import { MinifigSpec } from './minifig/types';

export interface Character {
  id: string;
  name: string;
  spec: MinifigSpec;
}

const black = '#16110e';
const darkBrown = '#2e1d14';
const gray = '#bdb8b0';

/**
 * Recipes in the style of the owner's reference portraits: warm yellow skin,
 * detailed printed faces, sculpted hair, a prop tied to the Memobrick job, and a
 * solid color tile. Betty, Armando and Patricia follow the references directly.
 */
export const CHARACTERS: Character[] = [
  {
    // Reference: long black hair with braids and bangs, big round glasses,
    // leopard blouse under a brown jacket, tablet with a smiley and books.
    id: 'betty', name: 'Betty',
    spec: {
      hair: 'braids', hairColor: black,
      face: { glasses3d: { shape: 'round', color: '#7c3420' }, braces: true, smile: 'grin', brows: 'thick', lashes: true },
      torso: 'leopardJacket', torsoColor: '#6b4226', accentColor: '#e8c48a',
      legsColor: '#5a3a24', skirt: true, shoesColor: '#2a1c14',
      accessory: 'tabletBooks', background: '#EDB43E',
    },
  },
  {
    // Reference: textured black hair, rectangular glasses, navy suit and tie,
    // white shirt, pocket square, typing on a laptop.
    id: 'armando', name: 'Armando',
    spec: {
      hair: 'wavy', hairColor: black,
      face: { glasses3d: { shape: 'rect', color: '#6e4a2a' }, smile: 'soft', brows: 'determined' },
      torso: 'suit', torsoColor: '#1d2236', accentColor: '#1a1f33', shirtColor: '#f7f7f4', pocketSquare: true,
      legsColor: '#1d2236', shoesColor: '#111111', accessory: 'laptop', background: '#3C6BC9',
    },
  },
  {
    // Reference: blonde high ponytail with side bangs, beige blazer over a red
    // turtleneck, gold pendant and earrings.
    id: 'patricia', name: 'Patricia',
    spec: {
      hair: 'highponytail', hairColor: '#d6a457',
      face: { smile: 'grin', brows: 'arched', lashes: true, lipstick: '#b8323f', eyeshadow: '#a07a5a' },
      torso: 'turtleneckBlazer', torsoColor: '#e3cfb2', accentColor: '#e3cfb2', shirtColor: '#c3202b',
      necklace: 'pendant', earrings: 'gold',
      legsColor: '#2a2420', skirt: true, accessory: 'phone', accessoryColor: '#e94e77', background: '#C25570',
    },
  },
  {
    // Reference style: dark straight shoulder-length hair, purple jacket, black
    // book; serious and in charge, as the coordinator.
    id: 'mariana', name: 'Mariana',
    spec: {
      hair: 'bob', hairColor: black,
      face: { smile: 'smirk', brows: 'arched', lashes: true, lipstick: '#8a2a3a' },
      torso: 'blazer', torsoColor: '#7a52b3', accentColor: '#7a52b3', shirtColor: '#1d1a20',
      necklace: 'gold', earrings: 'gold',
      legsColor: '#2a2230', skirt: true, accessory: 'book', accessoryColor: '#1d1a20', background: '#8E6CCB',
    },
  },
  {
    // Reference style: dark wavy hair, dark suit, phone at the ear, green tile.
    id: 'mario', name: 'Mario',
    spec: {
      hair: 'wavy', hairColor: '#3b2416',
      face: { smile: 'smirk', brows: 'thick' },
      torso: 'suit', torsoColor: '#2a2d33', accentColor: '#22252b', shirtColor: '#f2f2ee',
      legsColor: '#2a2d33', shoesColor: '#111111', accessory: 'phone', background: '#5E8F6A',
    },
  },
  {
    // Reference style: piled-up dark updo, purple jacket, bow blouse, green tile.
    id: 'margarita', name: 'Margarita',
    spec: {
      hair: 'updo', hairColor: '#4a3020',
      face: { smile: 'soft', brows: 'arched', lashes: true, lipstick: '#9c3550', wrinkles: true },
      torso: 'bowBlouseJacket', torsoColor: '#8a63c0', accentColor: '#8a63c0', shirtColor: '#f6f2ee',
      earrings: 'gold', legsColor: '#4a3a5c', skirt: true, accessory: 'star', background: '#6E9A7C',
    },
  },
  {
    // Reference style: feathered auburn hair with bangs, glasses, red blazer,
    // pearls over a black top, red tile.
    id: 'sofia', name: 'Sofía',
    spec: {
      hair: 'feathered', hairColor: '#8a3a1c',
      face: { glasses3d: { shape: 'rect', color: '#8a5a2a' }, smile: 'smirk', brows: 'arched', lashes: true, lipstick: '#9c1f2a' },
      torso: 'blazer', torsoColor: '#c8232d', accentColor: '#c8232d', shirtColor: '#1b1b1d',
      necklace: 'pearls', earrings: 'pearls',
      legsColor: '#1b1b1d', skirt: true, accessory: 'coffee', accessoryColor: '#c8232d', background: '#B8303A',
    },
  },
  {
    // Polished blonde with a side-swept bob, ivory suit, pearls, tablet.
    id: 'marcela', name: 'Marcela',
    spec: {
      hair: 'sideswept', hairColor: '#e2bd73',
      face: { smile: 'serious', brows: 'arched', lashes: true, lipstick: '#b0182f' },
      torso: 'blazer', torsoColor: '#efe4d2', accentColor: '#efe4d2', shirtColor: '#fffaf2',
      necklace: 'pearls', earrings: 'pearls',
      legsColor: '#e2d6c2', skirt: true, accessory: 'tablet', background: '#D9B97A',
    },
  },
  {
    // Betty's best friend: messy curls, glasses, argyle and bow tie, calculator.
    id: 'nicolas', name: 'Nicolás',
    spec: {
      hair: 'curly', hairColor: darkBrown,
      face: { glasses3d: { shape: 'rect', color: '#2b2b2b' }, smile: 'open', brows: 'thin' },
      torso: 'argyle', torsoColor: '#d9bd5c', accentColor: '#3d7a5a', shirtColor: '#f7f4ec',
      legsColor: '#6b5440', accessory: 'calculator', background: '#4FAE7B',
    },
  },
  {
    // Flamboyant designer: slicked hair, goatee, loud pink shirt, sketchbook.
    id: 'hugo', name: 'Hugo',
    spec: {
      hair: 'slick', hairColor: '#2a1b12',
      face: { glasses3d: { shape: 'rect', color: '#d6336c' }, goatee: true, smile: 'smirk', brows: 'arched' },
      torso: 'patterned', torsoColor: '#2b1d3a', accentColor: '#e84393', shirtColor: '#f5d0e4',
      legsColor: '#1d1d1f', accessory: 'sketchbook', accessoryColor: '#e84393', background: '#E2689B',
    },
  },
  {
    // Marcela's brother, the cold finance man: slicked black hair, gray suit.
    id: 'daniel', name: 'Daniel',
    spec: {
      hair: 'slick', hairColor: black,
      face: { smile: 'serious', brows: 'determined' },
      torso: 'suit', torsoColor: '#3e434c', accentColor: '#1c2a4a', shirtColor: '#f2f4f7', pocketSquare: true,
      legsColor: '#3e434c', shoesColor: '#141414', accessory: 'briefcase', accessoryColor: '#3b2a1e', background: '#6F87A3',
    },
  },
  {
    // Armando's father: gray receding hair, mustache, brown suit.
    id: 'roberto', name: 'Roberto',
    spec: {
      hair: 'receding', hairColor: gray,
      face: { smile: 'soft', brows: 'thick', wrinkles: true, mustache: true },
      torso: 'suit', torsoColor: '#4a4038', accentColor: '#8a2a2a', shirtColor: '#f5f1e6',
      legsColor: '#4a4038', shoesColor: '#1d1d1d', accessory: 'pen', accessoryColor: '#c8a24a', background: '#B59A78',
    },
  },
  {
    // Marcela's jet-setting sister: long blonde hair, sunglasses on head, pink.
    id: 'mariabeatriz', name: 'María Beatriz',
    spec: {
      hair: 'long', hairColor: '#e4bd72',
      face: { glasses: 'sunglassesOnHead', smile: 'grin', brows: 'arched', lashes: true, lipstick: '#e0457b' },
      torso: 'dress', torsoColor: '#ff5fa2', accentColor: '#ffd1e3', earrings: 'hoops',
      legsColor: '#ff5fa2', skirt: true, accessory: 'shoppingbag', accessoryColor: '#2ec4b6', background: '#F27DB6',
    },
  },
  {
    // The cuartel's eldest: gray bun, glasses on a chain, cardigan, tape measure.
    id: 'inesita', name: 'Inesita',
    spec: {
      hair: 'bun', hairColor: gray,
      face: { glasses: 'chain', glasses3d: { shape: 'round', color: '#8a6a2a' }, smile: 'soft', wrinkles: true, brows: 'thin', lashes: true },
      torso: 'cardigan', torsoColor: '#9b8bb5', accentColor: '#6d5a8a', shirtColor: '#f3eee6',
      legsColor: '#5a4e66', skirt: true, accessory: 'tapemeasure', background: '#A894D1',
    },
  },
  {
    // The receptionist: long curly hair, red lips, hoops, headset.
    id: 'auramaria', name: 'Aura María',
    spec: {
      hair: 'longcurly', hairColor: '#5a2a14',
      face: { smile: 'open', brows: 'arched', lashes: true, lipstick: '#d61f2c', eyeshadow: '#c06aa8', blush: true },
      torso: 'blouse', torsoColor: '#ff6b4a', accentColor: '#ffe3d8', necklace: 'gold', earrings: 'hoops',
      legsColor: '#1f1f1f', skirt: true, accessory: 'headset', background: '#F0805E',
    },
  },
  {
    // The cuartel's gossip: short curls, big earrings, magnifier.
    id: 'bertha', name: 'Bertha',
    spec: {
      hair: 'curly', hairColor: '#3a2416',
      face: { smile: 'open', brows: 'thick', blush: true, lipstick: '#c2255c', lashes: true },
      torso: 'blouse', torsoColor: '#20b2aa', accentColor: '#fff3c4', earrings: 'gold',
      legsColor: '#4a4a4a', skirt: true, accessory: 'magnifier', accessoryColor: '#8a5a2b', background: '#4FB8A8',
    },
  },
  {
    // "La jirafa": short hair, practical clothes, pen and notes.
    id: 'sandra', name: 'Sandra',
    spec: {
      hair: 'short', hairColor: '#5a3a24',
      face: { smile: 'soft', brows: 'thin', lashes: true },
      torso: 'polo', torsoColor: '#f39c12', accentColor: '#ffffff',
      legsColor: '#2d3e50', accessory: 'pen', accessoryColor: '#1e5aa8', background: '#F2A93B',
    },
  },
  {
    // The messenger: cap, uniform polo, envelope.
    id: 'freddy', name: 'Freddy',
    spec: {
      hair: 'messengercap', hairColor: black,
      face: { smile: 'grin', brows: 'thick', mustache: true },
      torso: 'polo', torsoColor: '#2f80ed', accentColor: '#1b4f9c',
      legsColor: '#2b3a55', shoesColor: '#1a1a1a', accessory: 'envelope', background: '#5FA4E8',
    },
  },
  {
    id: 'jenny', name: 'Jenny',
    spec: {
      hair: 'ponytail', hairColor: '#6a3d24',
      face: { smile: 'grin', brows: 'arched', lashes: true, lipstick: '#d6336c' },
      torso: 'tshirt', torsoColor: '#f1f1f1', accentColor: '#ff7a59',
      legsColor: '#4a78c2', accessory: 'coffee', accessoryColor: '#ff7a59', background: '#B9C2CE',
    },
  },
  {
    id: 'efrain', name: 'Efraín',
    spec: {
      hair: 'short', hairColor: '#1e1612',
      face: { smile: 'soft', brows: 'thick', mustache: true },
      torso: 'polo', torsoColor: '#2a9d8f', accentColor: '#1d6f66',
      legsColor: '#3d4a5a', shoesColor: '#1a1a1a', accessory: 'clipboard', background: '#5BB5A9',
    },
  },
  {
    // The building's security guard: cap with badge, uniform, walkie-talkie.
    id: 'wilson', name: 'Wilson',
    spec: {
      hair: 'guardcap', hairColor: black,
      face: { smile: 'serious', brows: 'thick' },
      torso: 'uniform', torsoColor: '#5f7a99', accentColor: '#24364f',
      legsColor: '#24364f', shoesColor: '#111111', accessory: 'walkie', background: '#7F97B5',
    },
  },
  {
    id: 'saul', name: 'Saúl',
    spec: {
      hair: 'short', hairColor: '#3a2a1e',
      face: { glasses3d: { shape: 'rect', color: '#2b2b2b' }, smile: 'soft', brows: 'thin' },
      torso: 'tshirt', torsoColor: '#7a8b3a', accentColor: '#f1e9c8',
      legsColor: '#4b4237', accessory: 'scanner', background: '#A6BE5E',
    },
  },
];

export const characterById = (id: string) => CHARACTERS.find((c) => c.id === id);
