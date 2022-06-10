import FilterPresenter from './presenter/filter-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterModel from './model/filter-model.js';
import PointsModel from './model/points-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteEventsElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(siteEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFiltersElement, filterModel, pointsModel);

//New event
const newEventButtonComponent = siteHeaderElement.querySelector('.trip-main__event-add-btn');

const handleNewPointFormClose = () => {
  newEventButtonComponent.disabled = false;
};

const handleNewPointButtonClick = () => {
  tripPresenter.createPoint(handleNewPointFormClose);
  newEventButtonComponent.disabled = true;
};

newEventButtonComponent.addEventListener('click', handleNewPointButtonClick);

filterPresenter.init();
tripPresenter.init();
