import {FilterType} from '../const';

export const filter = {
  [FilterType.ALL]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => point.dateTo >= new Date() || point.dateFrom < new Date() && point.dateTo > new Date()),
  [FilterType.PAST]: (points) => points.filter((point) => point.dateTo < new Date() || point.dateFrom < new Date() && point.dateTo > new Date()),
};
