import React from 'react';
import { 
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  } from 'react-router-dom';
import AppNavbar from '../components/appNavbar/appNavbar';
import Home from '../components/Pages/Home/Home';
import Menu from '../components/Pages/Menu/Menu';
import Order from '../components/Pages/Order/Order';
import Auth from '../components/Pages/Auth/Auth';
import Employees from '../components/Pages/Employees/Employees';
import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  };

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <AppNavbar />
            <div className="App-container">
              <div className="justify-content-center">
                <Switch>
                  <PublicRoute path='/' exact component={Home} authed={this.state.authed} />
                  <PublicRoute path='/home' component={Home} authed={this.state.authed} />
                  <PublicRoute path='/menu' component={Menu} authed={this.state.authed} />
                  <PublicRoute path='/order' component={Order} authed={this.state.authed} />
                  <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
                  <PrivateRoute path='/employees' component={Employees} authed={this.state.authed} />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
