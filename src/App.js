import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import signup from './screens/SignUp';
import login from './screens/Login/login';
import accessToken from './screens/accessToken';
import Package from './screens/package';
import customplan from './screens/package/customplan';
import cart from './screens/cart';
import payment from './screens/payment';
import home from './screens/home';
import history from './screens/history';
import PackageHistory from './screens/packagehistory';
import PurchasedPackage from './screens/packagehistory/purchasedPackage';
import Dashboard from './screens/dashboard';
import Partners from './screens/partners';
import OnBoardPartner from './screens/dashboard/onBoardPartner';
import ForgotPassword from './screens/password/forgotPassword';
import SetNewPassword from './screens/password/setNewPassword';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('access_token') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={signup} />
            <Route path="/signup/:flag" component={signup} />
            <Route path="/login" component={login} />
            <PrivateRoute path="/accessToken" component={accessToken} />
            <PrivateRoute path="/package" component={PackageHistory} />
            <PrivateRoute path="/customplan" component={customplan} />
            <PrivateRoute path="/cart" component={cart} />
            <PrivateRoute path="/payment" component={payment} />
            <PrivateRoute path="/availablePackage" component={Package} />
            <PrivateRoute
              path="/purchasedPackage"
              component={PurchasedPackage}
            />
            <PrivateRoute path="/home" component={home} />
            <PrivateRoute path="/history" component={history} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/partners" component={Partners} />
            <Route path="/onBoardPrtner" component={OnBoardPartner} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route
              path="/forgotPassowrd/:tenancyId/:type"
              component={SetNewPassword}
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
export default App;
