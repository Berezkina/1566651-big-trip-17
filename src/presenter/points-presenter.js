import {render, remove} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../const.js';
import {sortByDay, sortByPrice, sortByTime} from '../utils/point.js';

export default class PointsPresenter {
  #currentSortType = SortType.DEFAULT;

  #pointsContainer = null;
  #pointsModel = null;
  #sortComponent = null;

  #pointsListComponent = new PointsListView();
  #emptyListComponent = new EmptyListView();

  #points = [];
  #sourcedPoints = [];

  #pointPresenter = new Map();

  constructor(pointsContainer, pointsModel) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#points = [...this.#pointsModel.points];
    this.#points.sort(sortByDay);
    this.#sourcedPoints = [...this.#points];
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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderSort();
    this.#renderPointsList();
  };

  #renderSort = () => {
    if (this.#sortComponent !== null) {
      remove(this.#sortComponent);
    }
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#sortComponent, this.#pointsContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
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
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }
    this.#currentSortType = sortType;
  };

}
