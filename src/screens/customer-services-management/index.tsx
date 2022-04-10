import React, {useState} from 'react';
import styles from './customer-services-management.module.scss';

import Customer, {CustomerProps} from './customer';
import Seller, {SellerProps} from './seller';
import TabBar from '../../components/tab-bar';

interface Props {}

export type DashboardProps = Props & CustomerProps & SellerProps;

const Dashboard: React.FC<DashboardProps> = (props) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className={styles.container}>
      <TabBar
        items={[
          {title: 'خریدار', content: <Customer {...props} />},
          {title: 'فروشنده', content: <Seller {...props} />},
        ]}
        handleSelect={(i) => {
          setTabIndex(i);
        }}
        selected={tabIndex}
      />
    </div>
  );
};

export default Dashboard;
