import {render} from '../framework/render.js';
import FiltersView from '../view/filters-view.js';

export default class FiltersPresenter {
  #filtersContainer = null;
  #filtersComponent = new FiltersView();

  init = (filtersContainer) => {
    this.#filtersContainer = filtersContainer;

    render(this.#filtersComponent, this.#filtersContainer);
  };
}
