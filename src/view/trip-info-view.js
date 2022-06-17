import AbstractView from '../framework/view/abstract-view.js';
import {convertDate} from '../utils/point.js';

const createTitleString = (points) => {
  const pointsCount = points.length;

  if (pointsCount <= 3) {
    const destinations =  points.map((point) => point.destination.name);
    return destinations.join(' — ');
  }
  else if (pointsCount > 3) {
    return [points[0].destination.name, '...', points[pointsCount-1].destination.name].join(' — ');
  }
};

const createDatesString = (points) => {
  const pointsCount = points.length;
  const dateFrom = points[0].dateFrom;
  const dateTo = points[pointsCount-1].dateTo;

  return (dateFrom.getMonth() === dateTo.getMonth())
    ? `${convertDate(dateFrom)} — ${dateTo.getDate()}`
    : `${convertDate(dateFrom)} — ${convertDate(dateTo)}`;
};

const calculateCost = (points, offersList) => {
  let cost = 0;

  points.forEach((point) => {
    cost += point.basePrice;
    if (point.offers.length !== 0) {
      const offers = offersList.find((offer) => offer.type === point.type).offers;
      point.offers.forEach((id) => {
        cost += offers.find((offer) => offer.id === id).price;
      });
    }
  });
  return cost;
};

const createTripInfoTemplate = (points, offers) => {
  if (points.length === 0) {
    return;
  }

  const title = createTitleString(points);
  const dates = createDatesString(points);
  const cost = calculateCost(points, offers);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        <p class="trip-info__dates">${dates}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  #points = null;
  #offers = null;

  constructor(points, offers) {
    super();
    this.#points = points;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#offers);
  }
}
