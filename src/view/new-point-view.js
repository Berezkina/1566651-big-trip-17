import AbstractView from '../framework/view/abstract-view.js';
import {convertDate, convertTime, durationTime} from '../utils/point.js';
import {offerTypes} from '../const.js';

const createSelectedOffersList = (offers) => (
  `<h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${offers}
  </ul>`
);

const createSelectedOffersItems = ({title,price}) => (
  `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    +€&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`
);

const createOffers = (type, pointTypeOffer) => {
  if (typeof offerTypes[type] !== 'undefined' && pointTypeOffer.length !== 0) {
    const offersItems = offerTypes[type].filter((offerItem) => pointTypeOffer.includes(offerItem.id));
    return (
      createSelectedOffersList(offersItems.map((offer) => createSelectedOffersItems(offer)).join(''))
    );
  }
  else
  {
    return '';
  }
};

const createNewPointTemplate = (point) => {

  const {type, dateFrom, dateTo, destination, basePrice, isFavorite, offers} = point;

  const date = dateFrom !== null
    ? convertDate(dateFrom)
    : '';

  const startTime = dateFrom !== null
    ? convertTime(dateFrom)
    : '';

  const endTime = dateTo !== null
    ? convertTime(dateTo)
    : '';

  const duration = durationTime(dateFrom, dateTo);

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return (
    `<li class="trip-events__item">
      <div class="event">

        <time class="event__date" datetime="2019-03-18">${date}</time>

        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>

        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${endTime}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          €&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>

        ${createOffers(type, offers)}

        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
          </svg>
        </button>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>

      </div>
    </li>`
  );
};

export default class NewPointView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createNewPointTemplate(this.#point);
  }

  setRollupBtnClickHandler = (callback) => {
    this._callback.rollupBtn = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupBtnClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #rollupBtnClickHandler = () => {
    this._callback.rollupBtn();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

}
