import React, {useState} from 'react';
import VerticalTabBar from '../../../components/vertical-tab-bar';

import OnlineChat from './online-chat';
import RefereeRequests from './referee-requests';
import Questions from './questions';
import Comments from './comments';
import Rates from './rates';

import styles from '../customer-services-management.module.scss';

interface Props {}

export type searchTypes = 'customerBill' | 'coupon';

export type CustomerProps = Props;

const Customer: React.FC<CustomerProps> = (props) => {
  const [state, setState] = useState(0);
  return (
    <div className={styles.tabContainer}>
      <VerticalTabBar
        items={[
          {
            title: 'گفتگوی آنلاین',
            content: <OnlineChat />,
          },
          {
            title: 'درخواست‌های عودت کالا',
            content: <RefereeRequests />,
          },
          {
            title: 'پرسش‌ها',
            content: <Questions />,
          },
          {
            title: 'نظرات',
            content: <Comments />,
          },
          {
            title: 'امتیازات',
            content: <Rates />,
          },
        ]}
        selectedIndex={state}
        setSelectedIndex={(index) => setState(index)}
      />
    </div>
  );
};

export default Customer;
