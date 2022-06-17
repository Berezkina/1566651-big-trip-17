import FilterPresenter from './presenter/filter-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import FilterModel from './model/filter-model.js';
import PointsModel from './model/points-model.js';
import PointsApiService from './api/points-api-service.js';
import {END_POINT, AUTHORIZATION} from './const.js';

const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');
const siteTripMainElement = document.querySelector('.trip-main');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(siteEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFiltersElement, filterModel, pointsModel);
const tripInfoPresenter = new TripInfoPresenter(siteTripMainElement, pointsModel);

//New event
const newEventButtonComponent = document.querySelector('.trip-main__event-add-btn');

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
pointsModel.init()
  .finally(() => {
    tripInfoPresenter.init();
  });
