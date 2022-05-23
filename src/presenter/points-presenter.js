import {render, remove} from '../framework/render.js';
import SortingView from '../view/sorting-view.js';
import PointsListView from '../view/points-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';

export default class PointsPresenter {
  #pointsContainer = null;
  #pointsModel = null;

  #pointsListComponent = new PointsListView();
  #emptyListComponent = new EmptyListView();
  #sortComponent = new SortingView();

  #points = [];

  #pointPresenter = new Map();

  constructor(pointsContainer, pointsModel) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#points = [...this.#pointsModel.getPoints()];
    this.#renderEventList();
  };

  #renderEventList = () => {
    if (this.#points.length === 0) {
      this.#renderEmptyList();
    }
    else {
      this.#renderSort();
      this.#renderPointsList();
    }
  };

  #renderEmptyList = () => {
    render(this.#emptyListComponent, this.#pointsContainer);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#pointsContainer);
  };

  #renderPointsList = () => {
    render(this.#pointsListComponent, this.#pointsContainer);
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  };

  #clearPointsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
    remove(this.#pointsListComponent);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

}
