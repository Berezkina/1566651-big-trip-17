import FiltersPresenter from './presenter/filters-presenter.js';
import PointsPresenter from './presenter/points-presenter.js';
import PointsModel from './model/points-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteControlsElement = siteHeaderElement.querySelector('.trip-controls__filters');
const sitePointsElement = siteMainElement.querySelector('.trip-events');

const filtersPresenter = new FiltersPresenter();
filtersPresenter.init(siteControlsElement);

const pointsModel = new PointsModel();
const pointsPresenter = new PointsPresenter(sitePointsElement, pointsModel);

pointsPresenter.init();
