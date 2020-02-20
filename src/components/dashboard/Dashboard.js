import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import PlaceholderMessage from './PlaceholderMessage';
import Notifications from './Notifications';

class Dashboard extends Component {
  render() {
    const { auth, notifications } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else {
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m6">
              <PlaceholderMessage />
            </div>

            <div className="col s12 m5 offset-m1">
              <Notifications notifications={notifications} />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  notifications: state.firestore.ordered.notifications,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: 'notifications',
      limit: 3,
      orderBy: ['time', 'desc'],
    },
  ])
)(Dashboard);
