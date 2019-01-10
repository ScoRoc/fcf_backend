import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import AddEvent from './AddEvent';

class EventsPage extends React.Component {
  constructor(props) {
    super(props)
    this.initialState = {
      announcements: null,
    }
    this.state = {...this.initialState}
  }

  componentDidMount() {
    axios.get('/events').then(result => {
      this.setState({ events: result.data.events });
    });
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
