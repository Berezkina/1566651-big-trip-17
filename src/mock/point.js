import {getRandomInteger, randomDate, getRandomArrayElement} from '../utils/common.js';
import {generateDestination} from './destination.js';
import {offerTypes, POINT_TYPES} from '../const.js';
import {nanoid} from 'nanoid';

export const generatePoint = () => {

  const type = getRandomArrayElement(POINT_TYPES);
  let startDate = new Date();
  startDate = randomDate(startDate, new Date(startDate.getFullYear() + 1, 0, 1));
  const endDate = randomDate(startDate, new Date(startDate.getFullYear() + 1, 0, 1));

  return {
    id: nanoid(),
    type: type,
    dateFrom: startDate,
    dateTo: endDate,
    destination: generateDestination(),
    basePrice: getRandomInteger(1, 10000),
    isFavorite: Math.random() < 0.5,
    offers: typeof offerTypes[type] !== 'undefined' ? Array.from({length: 2}, () => getRandomInteger(1, offerTypes[type].length)) : [],
  };
};
