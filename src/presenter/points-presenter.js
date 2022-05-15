import SortingView from '../view/sorting-view.js';
import PointsListView from '../view/points-list-view.js';
import NewPointView from '../view/new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import EmptyListView from '../view/empty-list-view.js';
import {render} from '../render.js';

export default class PointsPresenter {
  #pointsContainer = null;
  #pointsModel = null;

  #pointsListComponent = new PointsListView();
  #emptyListComponent = new EmptyListView();
  #sortComponent = new SortingView();

  #points = [];

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
      render(this.#emptyListComponent, this.#pointsContainer);
    }
    else {
      render(this.#sortComponent, this.#pointsContainer);
      render(this.#pointsListComponent, this.#pointsContainer);

      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i]);
      }
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new NewPointView(point);
    const pointEditComponent = new EditPointView(point);

    const replacePointToForm = () => {
      this.#pointsListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#pointsListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#pointsListComponent.element);
  };

}
