import AbstractView from '../framework/view/abstract-view.js';
import {sortList} from '../const.js';

const createSortItemTemplate = (sortItem, sortType) => {
  const {name, label, isDisabled} = sortItem;
  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${sortType === name ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${name}" data-sort-type="${name}">${label}</label>
    </div>`
  );
};

const createSortTemplate = (sortType) => {
  const sortItemsTemplate = sortList.map((sortItem) => createSortItemTemplate(sortItem, sortType)).join('');
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
  </form>`;
};

export default class SortView extends AbstractView {
  #sortType = null;

  constructor(sortType) {
    super();
    this.#sortType = sortType;
  }

  get template() {
    return createSortTemplate(this.#sortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

}
