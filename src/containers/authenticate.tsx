import React, {Component} from 'react';
import AuthenticateScreen from '../screens/authenticate';
import {inject, observer} from 'mobx-react';
import {History, Location} from 'history';
import {match} from 'react-router';
import {InjectedAuthenticateStore} from '../stores';

interface routing {
  history: History;
  location: Location;
  match: match;
}

export type AuthenticateContainerProps = InjectedAuthenticateStore & routing;

@inject('authenticate')
@observer
class Authenticate extends Component<AuthenticateContainerProps> {
  constructor(props) {
    super(props);

    this.props.authenticate.setRoute(
      this.props.location,
      this.props.match,
      this.props.history,
    );
  }

  render() {
    return (
      <AuthenticateScreen
        forgotScreen={this.props.authenticate.forgotScreen}
        loginForm={{
          username: this.props.authenticate.username,
          password: this.props.authenticate.password,
          captcha: this.props.authenticate.captcha,
          rememberMe: this.props.authenticate.rememberMe,
          action: (target, value) => {
            this.props.authenticate.handleActions(target, value);
          },
        }}
        forgotForm={{
          username: this.props.authenticate.username,
          email: this.props.authenticate.email,
          captcha: this.props.authenticate.captcha,
          action: (target, value) => {
            this.props.authenticate.handleActions(target, value);
          },
        }}
      />
    );
  }
}

export default Authenticate as any;
