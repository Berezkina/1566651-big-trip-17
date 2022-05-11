import FiltersPresenter from './presenter/filters-presenter.js';
import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteControlsElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteEventsElement = siteMainElement.querySelector('.trip-events');

const filtersPresenter = new FiltersPresenter();
filtersPresenter.init(siteControlsElement);

const eventsPresenter = new EventsPresenter();

const pointsModel = new PointsModel();

eventsPresenter.init(siteEventsElement, pointsModel);
