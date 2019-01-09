import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Home.min.css';

class HomePage extends React.Component {
  render() {
    if (!this.props.manager) return <Redirect to='/signin' />;
    return (
      <div className='Home'>
        <p>home</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    manager: state.auth.manager,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(HomePage);
