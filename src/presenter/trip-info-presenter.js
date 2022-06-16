import {remove, render, RenderPosition} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #tripInfoComponent = null;

  #pointsModel = null;

  constructor(tripInfoContainer, pointsModel) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const points = this.#pointsModel.points;
    const offers = this.#pointsModel.offers;

    if (this.#tripInfoComponent) {
      remove(this.#tripInfoComponent);
    }

    if (points.length === 0) {
      return;
    }

    this.#tripInfoComponent = new TripInfoView(points, offers);
    render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  };

  #handleModelEvent = () => {
    this.init();
  };
}
