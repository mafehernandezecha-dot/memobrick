export type HairStyle =
  | 'short' | 'slick' | 'ponytail' | 'long' | 'bob' | 'bun'
  | 'curly' | 'voluminous' | 'receding' | 'guardcap' | 'messengercap'
  | 'wavy' | 'sideswept' | 'longcurly' | 'braids' | 'highponytail' | 'updo' | 'feathered';

export type TorsoPrint =
  | 'suit' | 'blouse' | 'vest' | 'uniform' | 'cardigan'
  | 'designer' | 'polo' | 'dress' | 'tshirt' | 'blazer'
  | 'argyle' | 'patterned' | 'turtleneckBlazer' | 'leopardJacket' | 'bowBlouseJacket';

export type Accessory =
  | 'folder' | 'laptop' | 'tablet' | 'phone' | 'envelope' | 'tarot'
  | 'tapemeasure' | 'sketchbook' | 'headset' | 'walkie' | 'briefcase'
  | 'calculator' | 'clipboard' | 'coffee' | 'magnifier' | 'shoppingbag'
  | 'star' | 'parcel' | 'scanner' | 'pen' | 'book' | 'tabletBooks' | 'none';

/** How the arms hold the prop: in front with both hands, typing, or phone at the ear. */
export type Pose = 'hold' | 'type' | 'phone' | 'idle';

export interface FaceSpec {
  /** Glasses printed on the face (the 3D frames are set with `glasses3d`). */
  glasses?: 'none' | 'sunglassesOnHead' | 'chain';
  glasses3d?: { shape: 'round' | 'rect'; color: string };
  braces?: boolean;
  lipstick?: string;
  mustache?: boolean;
  wrinkles?: boolean;
  smile?: 'grin' | 'soft' | 'smirk' | 'serious' | 'open';
  brows?: 'thin' | 'thick' | 'arched' | 'determined';
  /** Feminine eye print: lash line with a wing. */
  lashes?: boolean;
  blush?: boolean;
  goatee?: boolean;
  stubble?: boolean;
  eyeshadow?: string;
}

export interface MinifigSpec {
  hair: HairStyle;
  hairColor: string;
  face: FaceSpec;
  torso: TorsoPrint;
  torsoColor: string;
  /** Second print color: tie, shirt, scarf, vest, buttons. */
  accentColor: string;
  /** Shirt, blouse or turtleneck shown under jackets. */
  shirtColor?: string;
  necklace?: 'none' | 'pearls' | 'gold' | 'pendant';
  earrings?: 'none' | 'hoops' | 'pearls' | 'gold';
  pocketSquare?: boolean;
  sleeves?: 'long' | 'short';
  legsColor: string;
  skirt?: boolean;
  shoesColor?: string;
  accessory: Accessory;
  accessoryColor?: string;
  pose?: Pose;
  /** Head and hands color; classic yellow when unset. */
  skin?: string;
  /** Portrait background. */
  background: string;
}

/** Warm classic minifigure yellow, as in the reference portraits. */
export const SKIN = '#F4BE38';
