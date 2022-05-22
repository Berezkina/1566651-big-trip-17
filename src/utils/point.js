import dayjs from 'dayjs';

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

export const sortByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

export const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const sortByTime = (pointA, pointB) => {
  const durationTimeA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom), 'milliseconds');
  const durationTimeB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom), 'milliseconds');
  return durationTimeB - durationTimeA;
};
