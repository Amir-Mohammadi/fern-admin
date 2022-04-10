import React, {useState} from 'react';
import styles from './user-management.module.scss';

import Customer, {CustomerProps} from './customer';
import Seller, {SellerProps} from './seller';
import Manager , {ManagerProps} from './manager';
import TabBar from '../../components/tab-bar';

interface Props {}

export type UserManagementProps = Props & ManagerProps & SellerProps & CustomerProps;

const UserManagement: React.FC<UserManagementProps> = (props) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className={styles.container}>
      <TabBar
        items={[
          {title: 'مدیریت', content: <Manager {...props}/>},
          {title: 'خریدار', content: <Customer {...props}/>},
          {title: 'فروشنده', content: <Seller {...props}/>},
        ]}
        handleSelect={(i) => {
          setTabIndex(i);
        }}
        selected={tabIndex}
      />
    </div>
  );
};

export default UserManagement;
