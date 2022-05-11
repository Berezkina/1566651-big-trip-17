import SortingView from '../view/sorting-view.js';
import EventsListView from '../view/events-list-view.js';
import NewEventView from '../view/new-event-view.js';
import FormEditView from '../view/form-edit-view.js';
import {render} from '../render.js';

export default class EventsPresenter {
  eventsList = new EventsListView();

  init = (eventsContainer, pointsModel) => {
    this.eventsContainer = eventsContainer;
    this.pointsModel = pointsModel;
    this.tripPoints = [...this.pointsModel.getPoints()];

    render(new SortingView(), this.eventsContainer);
    render(this.eventsList, this.eventsContainer);
    render(new FormEditView(this.tripPoints[0]), this.eventsList.getElement(), 'afterbegin' );

    for (let i = 1; i < this.tripPoints.length; i++) {
      render(new NewEventView(this.tripPoints[i]), this.eventsList.getElement());
    }

  };
}
