export type HairStyle =
  | 'short' | 'slick' | 'ponytail' | 'long' | 'bob' | 'bun'
  | 'curly' | 'voluminous' | 'receding' | 'guardcap' | 'messengercap';

export type TorsoPrint =
  | 'suit' | 'blouse' | 'vest' | 'uniform' | 'cardigan'
  | 'designer' | 'polo' | 'dress' | 'tshirt' | 'blazer';

export type Accessory =
  | 'folder' | 'laptop' | 'tablet' | 'phone' | 'envelope' | 'tarot'
  | 'tapemeasure' | 'sketchbook' | 'headset' | 'walkie' | 'briefcase'
  | 'calculator' | 'clipboard' | 'coffee' | 'magnifier' | 'shoppingbag'
  | 'star' | 'parcel' | 'scanner' | 'pen' | 'none';

export interface FaceSpec {
  /** Glasses printed on the face. */
  glasses?: 'none' | 'bigRound' | 'small' | 'rectangle' | 'sunglassesOnHead' | 'chain';
  braces?: boolean;
  lipstick?: string;
  mustache?: boolean;
  freckles?: boolean;
  wrinkles?: boolean;
  smile?: 'grin' | 'soft' | 'smirk' | 'serious' | 'open';
  brows?: 'thin' | 'thick' | 'arched';
  lashes?: boolean;
  blush?: boolean;
}

export interface MinifigSpec {
  hair: HairStyle;
  hairColor: string;
  bangs?: boolean;
  face: FaceSpec;
  torso: TorsoPrint;
  torsoColor: string;
  /** Second print color: tie, shirt, scarf, vest, buttons. */
  accentColor: string;
  /** Shirt or collar color shown under suits and blazers. */
  shirtColor?: string;
  necklace?: 'none' | 'pearls' | 'gold';
  sleeves?: 'long' | 'short';
  legsColor: string;
  skirt?: boolean;
  shoesColor?: string;
  accessory: Accessory;
  accessoryColor?: string;
  /** Portrait background. */
  background: string;
}

export const SKIN = '#F6D23C';
