import FiltersPresenter from './presenter/trip-filters-presenter.js';
import EventsPresenter from './presenter/trip-events-presenter.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteControlsElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteEventsElement = siteMainElement.querySelector('.trip-events');

const filtersPresenter = new FiltersPresenter();
filtersPresenter.init(siteControlsElement);

const eventsPresenter = new EventsPresenter();
eventsPresenter.init(siteEventsElement);
