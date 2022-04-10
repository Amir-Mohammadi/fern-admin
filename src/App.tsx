import './styles/App.scss';
import Container from './containers';
import Auth from './containers/authenticate';
import {loadStores} from './stores/core/stores';
import {Provider} from 'mobx-react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {getSession} from './utils/auth-checker';
import {Component} from 'react';

loadStores();

class App extends Component {
  render() {
    return (
      <Provider {...global.__stores__}>
        <Switch>
          <Route
            exact
            path="/login"
            component={(props) => <Auth {...props} />}
          />

          <Route
            render={(props) =>
              !getSession() ? (
                <Redirect to="/login" />
              ) : (
                <Container {...props} />
              )
            }
          />
        </Switch>
      </Provider>
    );
  }
}

export default App;
