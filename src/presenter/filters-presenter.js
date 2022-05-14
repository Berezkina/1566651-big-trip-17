import FiltersView from '../view/filters-view.js';
import {render} from '../render.js';

export default class FiltersPresenter {
  #filtersContainer = null;

  init = (filtersContainer) => {
    this.#filtersContainer = filtersContainer;

    render(new FiltersView(), this.#filtersContainer);
  };
}
