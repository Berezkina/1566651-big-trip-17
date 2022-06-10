import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const EmptyListMsgType = {
  [FilterType.ALL]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createEmptyListTemplate = (filterType) => {
  const emptyListMsg = EmptyListMsgType[filterType];

  return (
    `<p class="trip-events__msg">
      ${emptyListMsg}
    </p>`
  );
};

export default class EmptyListView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
