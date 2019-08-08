import React from 'react';
import './Auth.scss';
import authRequests from '../../../helpers/data/authRequests';
import googleButton from '../../../images/login-google.png';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.history.push('/employees')
    }).catch(err => console.error('There was an error with auth', err));
  }

  render() {
    return (
      <div className="Auth">
        <button className="btn loginButton" onClick={this.authenticateUser}>
          <img src={googleButton} alt='google login button' />
        </button>
      </div>
    );
  }
}

export default Auth;
