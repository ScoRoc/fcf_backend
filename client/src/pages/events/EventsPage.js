import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
    }
    this.state = {...this.initialState}
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
    console.log('eventText: ', eventText)
    console.log('id: ', _id)
    console.log('startDate: ', startDate)
    console.log('types: ', types)
    console.log('url: ', url)
    console.log('throughDate: ', throughDate)

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
    return (
      <section>
        <h1>Events</h1>
        <AddEvent
          addEvent={this.addEvent}
          allowTypingPastLimit={true}
          charLimit={25}
        />
        <AllEvents
          events={events}
          deleteEvent={this.deleteEvent}
          editEvent={this.editEvent}
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
