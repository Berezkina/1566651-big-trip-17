import SortingView from '../view/sorting-view.js';
import EventsListView from '../view/events-list-view.js';
import NewEventView from '../view/new-event-view.js';
import FormEditView from '../view/form-edit-view.js';
import {render} from '../render.js';

export default class EventsPresenter {
  eventsList = new EventsListView();

  init = (eventsContainer) => {
    this.eventsContainer = eventsContainer;

    render(new SortingView(), this.eventsContainer);
    render(this.eventsList, this.eventsContainer);
    render(new FormEditView, this.eventsList.getElement(), 'afterbegin' );

    for (let i = 0; i < 3; i++) {
      render(new NewEventView, this.eventsList.getElement());
    }
  };
}
