import FiltersView from '../view/filters-view.js';
import {render} from '../render.js';

export default class FiltersPresenter {
  #filtersContainer = null;
  #filtersComponent = new FiltersView();

  init = (filtersContainer) => {
    this.#filtersContainer = filtersContainer;

    render(this.#filtersComponent, this.#filtersContainer);
  };
}
