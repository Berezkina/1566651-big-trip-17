import dayjs from 'dayjs';

export const DurationTimeSettings = {
  UNIT_MEASUREMENT: 'minute',
  HOURS_IN_DAY: 24,
  MINUTES_IN_HOUR: 60,
};

const SORTING_UNIT_MEASUREMENT = 'milliseconds';

export const convertDate = (date) => dayjs(date).format('MMM D');

export const convertTime = (date) => dayjs(date).format('HH:mm');

export const convertDateTime = (date) => dayjs(date).format('DD/MM/YY HH:mm');

export const durationTime = (dateFrom, dateTo) => {
  const diffMinutes = dayjs(dateTo).diff(dayjs(dateFrom), DurationTimeSettings.UNIT_MEASUREMENT);
  const days = Math.floor(diffMinutes / (DurationTimeSettings.HOURS_IN_DAY * DurationTimeSettings.MINUTES_IN_HOUR));
  const hours = Math.floor(diffMinutes / DurationTimeSettings.MINUTES_IN_HOUR % DurationTimeSettings.HOURS_IN_DAY);
  const minutes = Math.floor(diffMinutes % DurationTimeSettings.MINUTES_IN_HOUR);

  if (days !== 0) {
    return `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else if (hours !== 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else {
    return `${minutes.toString().padStart(2, '0')}M`;
  }
};

export const sortByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

export const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const sortByTime = (pointA, pointB) => {
  const durationTimeA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom), SORTING_UNIT_MEASUREMENT);
  const durationTimeB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom), SORTING_UNIT_MEASUREMENT);
  return durationTimeB - durationTimeA;
};

export const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
