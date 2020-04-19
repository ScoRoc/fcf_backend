import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import './Events.min.css';
import AddEvent from './AddEvent';
import AllEvents from './AllEvents';

import { getIndex, addItemToStateArr } from '../../utils/helpers';
import { isGreaterThanOrEqual, isLessThan } from '../../utils/comparisons';
import { mapDateStringToMomentObj } from '../../utils/date-helpers';

// PLACEHOLDER
const deleteWithAxios = console.log('useAxios placeholder...change with real func!!!');
const getWithAxios = console.log('useAxios placeholder...change with real func!!!');
const putWithAxios = console.log('useAxios placeholder...change with real func!!!');

class EventsPage extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      events: null,
      showCurrentEvents: true,
      showPastEvents: true,
    };
    this.state = { ...this.initialState };
  }

  sortByDate = arr => {
    return arr.sort((a, b) => {
      return a.startDate._d === b.startDate._d ? 0 : a.startDate._d < b.startDate._d ? -1 : 1;
    });
  };

  isPastDate = isLessThan(moment().startOf('day')._d);

  isCurrentDate = isGreaterThanOrEqual(moment().startOf('day')._d);

  toggleShowEvents = type => {
    this.setState({ [type]: !this.state[type] });
  };

  filterEvents = arr => {
    const { showCurrentEvents, showPastEvents } = this.state;
    const events = Array.isArray(arr) ? [...arr] : [];
    const today = moment().startOf('day')._d;
    const pastEvents = events.filter(event => this.isPastDate(event.startDate._d));
    const currentEvents = events.filter(event => {
      return event.throughDate
        ? this.isCurrentDate(event.throughDate._d)
        : this.isCurrentDate(event.startDate._d);
    });
    const filteredEvents =
      showPastEvents && showCurrentEvents
        ? events
        : !showPastEvents && showCurrentEvents
        ? currentEvents
        : showPastEvents && !showCurrentEvents
        ? pastEvents
        : [];
    return filteredEvents;
  };

  addEvent = event => {
    this.setState(prevState => {
      const keysToChange = ['startDate', 'throughDate'];
      const eventWithMoment = mapDateStringToMomentObj(event, keysToChange)[0];
      const events = addItemToStateArr(eventWithMoment, prevState, 'events');
      const sorted = this.sortByDate(events.events);
      return { events: sorted };
    });
  };

  deleteEvent = id => {
    const events = this.state.events.slice(0);
    deleteWithAxios({ id }).then(result => {
      // console.log('result: ', result);
      events.splice(getIndex('_id', events, id), 1);
      this.setState({ events });
    });
  };

  editEvent = ({ eventText, _id, startDate, type, url, throughDate }) => {
    putWithAxios({
      eventText,
      _id,
      startDate,
      type,
      url,
      throughDate,
    }).then(result => {
      const { updatedEvent } = result.data;
      const keysToChange = ['startDate', 'throughDate'];
      const updatedEventWithMoment = mapDateStringToMomentObj(updatedEvent, keysToChange)[0];
      this.setState(prevState => {
        const events = prevState.events.slice(0);
        events.splice(
          getIndex('_id', events, updatedEventWithMoment._id),
          1,
          updatedEventWithMoment,
        );
        const sorted = this.sortByDate(events);
        return { events: sorted };
      });
    });
  };

  componentDidMount() {
    if (this.props.manager) {
      getWithAxios().then(result => {
        const keysToChange = ['startDate', 'throughDate'];
        this.setState({
          events: mapDateStringToMomentObj(result.data.events, keysToChange),
        });
      });
    }
  }

  render() {
    if (!this.props.manager) return <Redirect to="/signin" />;
    const { events } = this.state;
    const displayedEvents = this.filterEvents(events);
    return (
      <section className="EventsPage">
        <h1>Events</h1>
        <AddEvent addEvent={this.addEvent} allowTypingPastLimit={true} charLimit={22} />
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
