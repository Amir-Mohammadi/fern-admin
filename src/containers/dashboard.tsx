import React, {Component} from 'react';
import DashboardScreen from '../screens/dashboard';

class Dashboard extends Component {
  render() {
   
    return (
      <DashboardScreen
        statistics={{
          todayVisits: [12, 212, 48, 6, 6],
          previousMonthNS: [546, 78, 31, 57, +98, 4],
          registeredUsers: [12, 212, 48, 6, 6],
          totalGrossSales: [646, 784, 24, 36, 7, 1478, 646],
        }}
      />
    );
  }
}

export default Dashboard as any;
