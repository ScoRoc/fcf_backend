import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './Events.min.css';
import AddEvent from './AddEvent';
import AllEvents from './AllEvents';

import { getIndex, addItemToStateArr } from '../../utils/helpers';
import useAxios from '../../utils/axios-helpers';

const path = '/events';
const { deleteWithAxios, getWithAxios, putWithAxios } = useAxios(path);

class EventsPage extends React.Component {
  constructor(props) {
    super(props)
    this.initialState = {
      events: null,
      showCurrentEvents: true,
      showPastEvents: true,
    }
    this.state = {...this.initialState}
  }

  toggleShowEvents = type => {
    this.setState({ [type]: !this.state[type] });
  }

  filterEvents = arr => {
    const { showCurrentEvents, showPastEvents } = this.state;
    const events = arr || [];
    const today = new Date();
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth();
    const date = now.getUTCDate();
    const t = new Date( Date.UTC(year, month, date) ).toISOString();
    console.log( 't: ', t);
    const pastEvents = events.filter(event => event.startDate < today);
    const currentEvents = events.filter(event => event.startDate >= today);
    const filteredEvents  = showPastEvents && showCurrentEvents
                          ? events
                          : !showPastEvents && showCurrentEvents
                            ? currentEvents
                            : showPastEvents && !showCurrentEvents
                              ? pastEvents
                              : [];
    for (let evt of events) {
      console.log('startDate: ', evt.startDate)
    }
    console.log('today: ', today)
    return filteredEvents;
  }

  addEvent = event => {
    this.setState(prevState => {
      return addItemToStateArr(event, prevState, 'events');
    });
  }

  deleteEvent = id => {
    const events = this.state.events.slice(0);
    deleteWithAxios({ id }).then(result => {
      // console.log('result: ', result);
      events.splice(getIndex(id, events), 1);
      this.setState({ events });
    });
  }

  editEvent = ({eventText, _id, startDate, types, url, throughDate}) => {
    const events = this.state.events.slice(0);
    putWithAxios({
      eventText, _id, startDate, types, url, throughDate
    }).then(result => {
      // const { updatedEvent } = result.data;
      this.setState({ events });
    });
  }

  componentDidMount() {
    if (this.props.manager) {
      getWithAxios().then(result => {
        this.setState({ events: result.data.events });
      });
    }
  }

  render() {
    if (!this.props.manager) return <Redirect to='/signin' />;
    const { events } = this.state;
    const displayedEvents = this.filterEvents(events);
    return (
      <section>
        <h1>Events</h1>
        <AddEvent
          addEvent={this.addEvent}
          allowTypingPastLimit={true}
          charLimit={25}
        />
        <AllEvents
          events={displayedEvents}
          deleteEvent={this.deleteEvent}
          editEvent={this.editEvent}
          showCurrentEvents={this.state.showCurrentEvents}
          showPastEvents={this.state.showPastEvents}
          toggleShowEvents={this.toggleShowEvents}
        />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    manager: state.auth.manager,
  };
};

export default connect(mapStateToProps)(EventsPage);
