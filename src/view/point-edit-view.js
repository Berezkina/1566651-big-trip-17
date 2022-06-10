import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {convertDateTime} from '../utils/point.js';
import {POINT_TYPES, CITY_NAMES, offerTypes} from '../mock/const.js';
import {generateDestination} from '../mock/destination.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  type: 'taxi',
  dateFrom: null,
  dateTo: null,
  destination: {
    description: '',
    name: '',
    pictures: []
  },
  basePrice: 0,
  isFavorite: false,
  offers: [],
};

const createTypeListTemplate = (typeList, currentType) => (
  `<div class="event__type-item">
    ${typeList.map((type) =>
    `<input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === currentType ? 'checked' : ''}>
     <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type.charAt(0).toUpperCase() + type.slice(1)}</label>`).join('')}
  </div>`
);

const createOffersTemplate = (offers, currentType) => {
  if (typeof offerTypes[currentType] !== 'undefined') {
    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${offerTypes[currentType].map(({id, title, price}) => {
        const checked = offers.includes(id) ? 'checked' : '';
        return (
          `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" ${checked}>
            <label class="event__offer-label" for="event-offer-${id}">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>`);}).join('')}
        </div>
      </section>`);
  }
  else
  {
    return '';
  }
};

const createDescriptionTemplate = (destination) => (
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${destination.pictures.map(({src, description}) =>`<img class="event__photo" src="${src}" alt="${description}">`).join('')}
        </div>
      </div>
  </section>`
);

const createDestinationListTemplate = (destinationList) => (
  `${destinationList.map((destination) => `<option value="${destination}"></option>`).join('')}`
);

const createPointEditTemplate = (point) => {

  const {type, dateFrom, dateTo, destination, basePrice, offers} = point;

  const offerList = createOffersTemplate(offers, type);
  const typeList = createTypeListTemplate(POINT_TYPES, type);
  const description = createDescriptionTemplate(destination);
  const destinationList = createDestinationListTemplate(CITY_NAMES);

  const startTime = dateFrom !== null
    ? convertDateTime(dateFrom)
    : '';

  const endTime = dateTo !== null
    ? convertDateTime(dateTo)
    : '';

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typeList}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationList}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          ${offerList}
          ${description}
        </section>

      </form>
    </li>`);
};

export default class PointEditView extends AbstractStatefulView {
  #datepicker = null;

  constructor(point = BLANK_POINT) {
    super();
    this._state = PointEditView.parsePointToState(point);
    this.#setInnerHandlers();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  get template() {
    return createPointEditTemplate(this._state);
  }

  #rollupBtnClickHandler = () => {
    this._callback.rollupBtn();
  };

  setRollupBtnClickHandler = (callback) => {
    this._callback.rollupBtn = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupBtnClickHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(PointEditView.parseStateToPoint(this._state));
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(PointEditView.parseStateToPoint(this._state));
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    if (!CITY_NAMES.find((city) => city === evt.target.value)) {
      evt.target.setCustomValidity('Выберите пункт назначения из списка');
      evt.target.reportValidity();
      return;
    }

    this.updateElement({
      destination: generateDestination(evt.target.value),
    });
  };

  #startTimeChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #endTimeChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        defaultDate: this._state.dateFrom,
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        maxDate: this._state.dateTo,
        onChange: this.#startTimeChangeHandler,
      },
    );

    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        defaultDate: this._state.dateTo,
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: this._state.dateFrom,
        onChange: this.#endTimeChangeHandler,
      },
    );
  };

  #offerClickHandler = (evt) => {
    evt.preventDefault();
    const offerId = Number(evt.target.id.slice(-1));

    if (evt.target.checked) {
      this._state.offers.push(offerId);
    }
    else {
      this._state.offers = this._state.offers.filter((id) => id !== offerId);
    }

    this.updateElement({
      offers: this._state.offers,
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    if (isNaN(Number(evt.target.value))) {
      evt.target.setCustomValidity('Ввод должен быть числовым');
      evt.target.reportValidity();
      return;
    }

    this.updateElement({
      basePrice: evt.target.value,
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((input) => input.addEventListener('click', this.#offerClickHandler));
    this.#setDatepicker();
  };

  static parsePointToState = (point) => ({...point});

  static parseStateToPoint = (state) => {
    const point = {...state};
    return point;
  };

  reset = (point) => {
    this.updateElement(PointEditView.parsePointToState(point),);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setRollupBtnClickHandler(this._callback.rollupBtn);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  };
}
