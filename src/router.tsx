import {Route, Switch, Redirect} from 'react-router-dom';
import Dashboard from './containers/dashboard';
import RevenueManagement from './containers/revenue-management';
import ContentManagement from './containers/content-management';
import UserManagement from './containers/user-management';
import CustomerServiceManagementScreen from './containers/customer-services-management';
import FileManagement from './containers/file-management';

function Router(props) {

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/revenue-management">
        <RevenueManagement />
      </Route>
      <Route exact path="/user-management">
        <UserManagement />
      </Route>
      <Route exact path="/content-management">
        <ContentManagement />
      </Route>
      <Route exact path="/customer-services-management">
        <CustomerServiceManagementScreen />
      </Route>
      <Route exact path="/statistics">
        <div>statistics</div>
      </Route>
      <Route exact path="/file-management">
        <FileManagement />
      </Route>
    </Switch>
  );
}
export default Router;
