import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const convertDate = (date) => dayjs(date).format('MMM D');

export const convertTime = (date) => dayjs(date).format('HH:mm');

export const convertDateTime = (date) => dayjs(date).format('DD/MM/YY HH:mm');

export const durationTime = (dateFrom, dateTo) => {
  const diffMills = dayjs(dateTo).diff(dayjs(dateFrom), 'milliseconds');
  const days = Math.floor(diffMills / (24 * 60 * 60 * 1000));
  const hours = Math.floor(diffMills / (60 * 60 * 1000) % 24);
  const minutes = Math.floor(diffMills / (60 * 1000) % 60);

  if (days !== 0) {
    return `${days}D ${hours}H ${minutes}M`;
  } else if (hours !== 0) {
    return `${hours}H ${minutes}M`;
  } else {
    return `${minutes}M`;
  }

};

export const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

export const getRandomArraySlice = (array) => {
  const elementsNumber = getRandomInteger(0, array.length - 1);
  return array.sort(() => 0.5 - Math.random()).slice(0, elementsNumber);
};
