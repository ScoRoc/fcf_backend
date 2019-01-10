import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import AddEvent from './AddEvent';

import { getIndex, addItemToStateArr } from '../../utils/helpers';
// import { deleteWithAxios, editWithAxios } from '../../utils/axios-helpers';
import useAxios from '../../utils/axios-helpers';
const path = '/events';
const { deleteWithAxios, editWithAxios } = useAxios(path);

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

  editAnnouncement = (eventText, id, startDate, type, url, throughDate) => {
    const events = this.state.events.slice(0);
    editWithAxios({
      eventText, id, startDate, type, url, throughDate
    }).then(result => {
      // const { updatedEvent } = result.data;
      this.setState({ events });
    });
  }

  componentDidMount() {
    if (this.props.manager) {
      axios.get('/events').then(result => {
        this.setState({ events: result.data.events });
      });
    }
  }

  render() {
    if (!this.props.manager) return <Redirect to='/signin' />;
    return (
      <section>
        <h1>Events</h1>
        <AddEvent
          addEvent={this.addEvent}
          allowTypingPastLimit={true}
          charLimit={25}
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
