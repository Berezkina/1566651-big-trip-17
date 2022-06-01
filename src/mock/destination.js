import {getRandomInteger, getRandomArrayElement, getRandomArraySlice} from '../utils/common.js';
import {CITY_NAMES, DESCRIPTIONS} from '../const.js';

const generatePictures = () => ({
  src: `http://picsum.photos/248/152?r=${getRandomInteger(1,100)}`,
  description: getRandomArrayElement(DESCRIPTIONS),
});

export const generateDestination = (destination) => ({
  name: destination ? destination : getRandomArrayElement(CITY_NAMES),
  description: getRandomArraySlice(DESCRIPTIONS),
  pictures: Array.from({length: getRandomInteger(0, 10)}, generatePictures),
});
