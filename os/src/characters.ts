import { MinifigSpec } from './minifig/types';

export interface Character {
  id: string;
  name: string;
  spec: MinifigSpec;
}

const brownHair = '#4a2e1c';
const darkHair = '#1e1a18';
const blonde = '#e3b75a';
const gray = '#b9b6b0';

export const CHARACTERS: Character[] = [
  {
    id: 'betty', name: 'Betty',
    spec: {
      hair: 'ponytail', hairColor: brownHair, bangs: true,
      face: { glasses: 'bigRound', braces: true, smile: 'grin', brows: 'thick', freckles: true },
      torso: 'vest', torsoColor: '#8a6a4a', accentColor: '#f4efe2', shirtColor: '#efe6d2',
      legsColor: '#6b4a32', skirt: true, shoesColor: '#3a2a20',
      accessory: 'folder', accessoryColor: '#c0392b', background: '#F7C948',
    },
  },
  {
    id: 'armando', name: 'Armando',
    spec: {
      hair: 'slick', hairColor: darkHair,
      face: { smile: 'smirk', brows: 'thick' },
      torso: 'suit', torsoColor: '#1f2a44', accentColor: '#8e1b2b', shirtColor: '#f5f5f2',
      legsColor: '#1f2a44', shoesColor: '#141414', accessory: 'laptop', background: '#5B8DEF',
    },
  },
  {
    id: 'mariana', name: 'Mariana',
    spec: {
      hair: 'long', hairColor: darkHair,
      face: { smile: 'soft', brows: 'arched', lashes: true, lipstick: '#8e2a5a' },
      torso: 'designer', torsoColor: '#6a3d9a', accentColor: '#f1c40f', shirtColor: '#3a1f5c',
      necklace: 'gold', legsColor: '#3a1f5c', skirt: true, accessory: 'tarot', background: '#B79CED',
    },
  },
  {
    id: 'nicolas', name: 'Nicolás',
    spec: {
      hair: 'curly', hairColor: '#2c1d14',
      face: { glasses: 'small', smile: 'open', brows: 'thin' },
      torso: 'vest', torsoColor: '#2e7d5b', accentColor: '#f7f2e4', shirtColor: '#f2e9d4',
      legsColor: '#5c4a3a', accessory: 'calculator', background: '#6FCF97',
    },
  },
  {
    id: 'hugo', name: 'Hugo',
    spec: {
      hair: 'slick', hairColor: '#3a2618',
      face: { glasses: 'rectangle', smile: 'smirk', brows: 'arched' },
      torso: 'designer', torsoColor: '#1d1d1f', accentColor: '#e84393', shirtColor: '#f4f4f4',
      legsColor: '#1d1d1f', accessory: 'sketchbook', accessoryColor: '#e84393', background: '#F78FB3',
    },
  },
  {
    id: 'marcela', name: 'Marcela',
    spec: {
      hair: 'bob', hairColor: blonde,
      face: { smile: 'serious', brows: 'arched', lashes: true, lipstick: '#b03a48' },
      torso: 'blazer', torsoColor: '#f1e7d6', accentColor: '#c9a86a', shirtColor: '#fffaf2',
      necklace: 'pearls', legsColor: '#e6dccb', skirt: true, accessory: 'tablet', background: '#EAD9B5',
    },
  },
  {
    id: 'patricia', name: 'Patricia',
    spec: {
      hair: 'voluminous', hairColor: '#e8a24a',
      face: { smile: 'smirk', brows: 'arched', lashes: true, lipstick: '#d6336c', blush: true },
      torso: 'blouse', torsoColor: '#ff7a8a', accentColor: '#ffffff',
      legsColor: '#2b2b2b', skirt: true, accessory: 'phone', accessoryColor: '#ff4fa3', background: '#FFB4A2',
    },
  },
  {
    id: 'daniel', name: 'Daniel',
    spec: {
      hair: 'slick', hairColor: '#2a211b',
      face: { smile: 'serious', brows: 'thick' },
      torso: 'suit', torsoColor: '#4a4f57', accentColor: '#1c2a4a', shirtColor: '#dfe8f2',
      legsColor: '#4a4f57', shoesColor: '#141414', accessory: 'briefcase', accessoryColor: '#3b2a1e', background: '#8AA1B9',
    },
  },
  {
    id: 'mario', name: 'Mario',
    spec: {
      hair: 'short', hairColor: '#3b2416',
      face: { smile: 'grin', brows: 'thick' },
      torso: 'blazer', torsoColor: '#b8b2a7', accentColor: '#c0392b', shirtColor: '#9cc3e6',
      legsColor: '#8c867c', shoesColor: '#3a2a20', accessory: 'phone', background: '#F5A35C',
    },
  },
  {
    id: 'roberto', name: 'Roberto',
    spec: {
      hair: 'receding', hairColor: gray,
      face: { smile: 'soft', brows: 'thick', wrinkles: true, mustache: true },
      torso: 'suit', torsoColor: '#5a4a3a', accentColor: '#c8a24a', shirtColor: '#f5f1e6',
      legsColor: '#5a4a3a', shoesColor: '#1d1d1d', accessory: 'pen', accessoryColor: '#c8a24a', background: '#D8C3A5',
    },
  },
  {
    id: 'margarita', name: 'Margarita',
    spec: {
      hair: 'bun', hairColor: '#d9c9a3',
      face: { smile: 'soft', brows: 'arched', wrinkles: true, lipstick: '#a8445a' },
      torso: 'blazer', torsoColor: '#7a2e4a', accentColor: '#e8c9a0', shirtColor: '#f6ead8',
      necklace: 'pearls', legsColor: '#5c2338', skirt: true, accessory: 'star', background: '#F2A7B8',
    },
  },
  {
    id: 'mariabeatriz', name: 'María Beatriz',
    spec: {
      hair: 'long', hairColor: '#c58b4a',
      face: { glasses: 'sunglassesOnHead', smile: 'grin', brows: 'arched', lashes: true, lipstick: '#e0457b' },
      torso: 'dress', torsoColor: '#ff5fa2', accentColor: '#ffd1e3',
      legsColor: '#ff5fa2', skirt: true, accessory: 'shoppingbag', accessoryColor: '#2ec4b6', background: '#FF8FC7',
    },
  },
  {
    id: 'inesita', name: 'Inesita',
    spec: {
      hair: 'bun', hairColor: gray,
      face: { glasses: 'chain', smile: 'soft', wrinkles: true, brows: 'thin' },
      torso: 'cardigan', torsoColor: '#9b8bb5', accentColor: '#6d5a8a', shirtColor: '#f3eee6',
      legsColor: '#5a4e66', skirt: true, accessory: 'tapemeasure', background: '#C9B8E8',
    },
  },
  {
    id: 'auramaria', name: 'Aura María',
    spec: {
      hair: 'curly', hairColor: '#8a3b1e',
      face: { smile: 'open', brows: 'arched', lashes: true, lipstick: '#e03131', blush: true },
      torso: 'blouse', torsoColor: '#ff6b4a', accentColor: '#ffe3d8',
      necklace: 'gold', legsColor: '#2b2b2b', skirt: true, accessory: 'headset', background: '#FF9F7F',
    },
  },
  {
    id: 'sofia', name: 'Sofía',
    spec: {
      hair: 'bob', hairColor: darkHair,
      face: { smile: 'soft', brows: 'thin', lipstick: '#b02a2a' },
      torso: 'blouse', torsoColor: '#d63031', accentColor: '#ffffff',
      legsColor: '#3b3b3b', skirt: true, accessory: 'coffee', accessoryColor: '#d63031', background: '#E5534B',
    },
  },
  {
    id: 'bertha', name: 'Bertha',
    spec: {
      hair: 'curly', hairColor: '#3a2416',
      face: { smile: 'open', brows: 'thick', blush: true, lipstick: '#c2255c' },
      torso: 'blouse', torsoColor: '#20b2aa', accentColor: '#fff3c4',
      legsColor: '#4a4a4a', skirt: true, accessory: 'magnifier', accessoryColor: '#8a5a2b', background: '#7ED6C5',
    },
  },
  {
    id: 'sandra', name: 'Sandra',
    spec: {
      hair: 'short', hairColor: '#5a3a24',
      face: { smile: 'soft', brows: 'thin', lashes: true },
      torso: 'polo', torsoColor: '#f39c12', accentColor: '#ffffff',
      legsColor: '#2d3e50', accessory: 'pen', accessoryColor: '#1e5aa8', background: '#FFC979',
    },
  },
  {
    id: 'freddy', name: 'Freddy',
    spec: {
      hair: 'messengercap', hairColor: darkHair,
      face: { smile: 'grin', brows: 'thick' },
      torso: 'polo', torsoColor: '#2f80ed', accentColor: '#1b4f9c',
      legsColor: '#2b3a55', shoesColor: '#1a1a1a', accessory: 'envelope', background: '#8EC5FF',
    },
  },
  {
    id: 'jenny', name: 'Jenny',
    spec: {
      hair: 'ponytail', hairColor: '#6a3d24',
      face: { smile: 'grin', brows: 'arched', lashes: true, lipstick: '#d6336c' },
      torso: 'tshirt', torsoColor: '#f1f1f1', accentColor: '#ff7a59',
      legsColor: '#4a78c2', accessory: 'coffee', accessoryColor: '#ff7a59', background: '#D9DEE5',
    },
  },
  {
    id: 'efrain', name: 'Efraín',
    spec: {
      hair: 'short', hairColor: '#2a2018',
      face: { smile: 'soft', brows: 'thick', mustache: true },
      torso: 'polo', torsoColor: '#2a9d8f', accentColor: '#1d6f66',
      legsColor: '#3d4a5a', shoesColor: '#1a1a1a', accessory: 'clipboard', background: '#7FCDC3',
    },
  },
  {
    id: 'wilson', name: 'Wilson',
    spec: {
      hair: 'guardcap', hairColor: darkHair,
      face: { smile: 'serious', brows: 'thick' },
      torso: 'uniform', torsoColor: '#5f7a99', accentColor: '#24364f',
      legsColor: '#24364f', shoesColor: '#111111', accessory: 'walkie', background: '#9DB4CF',
    },
  },
  {
    id: 'saul', name: 'Saúl',
    spec: {
      hair: 'short', hairColor: '#3a2a1e',
      face: { glasses: 'rectangle', smile: 'soft', brows: 'thin' },
      torso: 'tshirt', torsoColor: '#7a8b3a', accentColor: '#f1e9c8',
      legsColor: '#4b4237', accessory: 'scanner', background: '#BFD27A',
    },
  },
];

export const characterById = (id: string) => CHARACTERS.find((c) => c.id === id);
