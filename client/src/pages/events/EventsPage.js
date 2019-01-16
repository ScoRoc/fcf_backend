import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import './Events.min.css';
import AddEvent from './AddEvent';
import AllEvents from './AllEvents';

import { getIndex, addItemToStateArr } from '../../utils/helpers';
import { isGreaterThanOrEqual, isLessThan } from '../../utils/comparisons';
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

  isPastDate = isLessThan( moment().startOf('day')._d );

  isCurrentDate = isGreaterThanOrEqual( moment().startOf('day')._d );

  stringToMomentDate = str => moment(str);

  mapEventsStringToDateObj = events => {
    return events.map(event => {
      return {
        ...event,
        startDate: this.stringToMomentDate(event.startDate),
        throughDate: event.throughDate !== null
                        ? this.stringToMomentDate(event.through)
                        : null,
      };
    });
  }

  filterEvents = arr => {
    const { showCurrentEvents, showPastEvents } = this.state;
    const events = arr || [];
    const today = moment().startOf('day')._d;
    const pastEvents = events.filter(event => this.isPastDate(event.startDate._d));
    const currentEvents = events.filter(event => this.isCurrentDate(event.startDate._d));
    const filteredEvents  = showPastEvents && showCurrentEvents
                          ? events
                          : !showPastEvents && showCurrentEvents
                            ? currentEvents
                            : showPastEvents && !showCurrentEvents
                              ? pastEvents
                              : [];
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
        this.setState({
          events: this.mapEventsStringToDateObj(result.data.events),
        });
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
