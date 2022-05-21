import {render} from '../framework/render.js';
import FiltersView from '../view/filters-view.js';

export default class FiltersPresenter {
  #filtersContainer = null;
  #filtersComponent = new FiltersView();

  constructor(filtersContainer) {
    this.#filtersContainer = filtersContainer;
  }

  init = () => {
    this.#renderFilters();
  };

  #renderFilters = () => {
    render(this.#filtersComponent, this.#filtersContainer);
  };

}
