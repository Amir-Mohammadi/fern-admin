import {action, observable} from 'mobx';
import {History, Location} from 'history';
import {match} from 'react-router';

import {Target as loginFormTarget} from '../components/authenticate/login';
import {Target as forgotFormTarget} from '../components/authenticate/forget';

import api from './../api';
import Cookies from 'js-cookie';

type Target = loginFormTarget | forgotFormTarget;

export default class Authenticate {
  @observable username: string = '';
  @observable email: string = '';
  @observable password: string = '';
  @observable captcha: string = '';
  @observable rememberMe: boolean = false;
  @observable forgotScreen: boolean = false;

  @observable location?: Location;
  @observable match?: match;
  @observable history?: History;

  @action setRoute(location, match, history) {
    this.location = location;
    this.match = match;
    this.history = history;
  }

  private onLogin = async () => {
    const data = {email: this.username, password: this.password};
    try {
      const loginRes = await api.v1.auth.login(data);
      if (loginRes.status == 201) {
        Cookies.set('__token', loginRes.data.token, {expires: 1 / 8});
        this.history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  @action handleActions = (target: Target, value?: any) => {
    switch (target) {
      case loginFormTarget.USERNAME || forgotFormTarget.USERNAME:
        this.username = value;
        break;
      case loginFormTarget.PASSWORD:
        this.password = value;
        break;
      case loginFormTarget.REMEMBER_ME:
        this.rememberMe = !this.rememberMe;
        break;
      case loginFormTarget.FORGOT_PASS:
        this.forgotScreen = true;
        break;
      case loginFormTarget.CAPTCHA || forgotFormTarget.CAPTCHA:
        this.captcha = value;
        break;
      case loginFormTarget.SUBMIT:
        this.onLogin();
        break;
      case forgotFormTarget.EMAIL:
        this.email = value;
        break;
      case forgotFormTarget.SUBMIT:
        break;
      default:
        break;
    }
  };
}

export interface InjectedAuthenticateStore {
  authenticate: Authenticate;
}
