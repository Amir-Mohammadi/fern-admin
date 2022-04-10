import React, {useState} from 'react';
import VerticalTabBar from '../../../components/vertical-tab-bar';

import styles from '../content-management.module.scss';
import Mag from './mag';
import Products, {ProductsProps} from './products';
import StaticContent from './static-content';
import TopMenuTabs from './top-menu-tabs';
import CommonQuestions from './common-questions';

interface Props {}

export type searchTypes = 'customerBill' | 'coupon';

export type CustomerProps = Props & ProductsProps;

const Customer: React.FC<CustomerProps> = (props) => {
  const [state, setState] = useState(0);
  return (
    <div className={styles.tabContainer}>
      <VerticalTabBar
        items={[
          {
            title: 'مجله',
            content: <Mag />,
          },
          {
            title: 'محصولات',
            content: <Products {...props} />,
          },
          {
            title: 'محتوای ثابت-لوگو',
            content: <StaticContent />,
          },
          {
            title: 'تب های تاپ منو',
            content: <TopMenuTabs />,
          },
          {
            title: 'پرسش های متداول',
            content: <CommonQuestions />,
          },
        ]}
        selectedIndex={state}
        setSelectedIndex={(index) => setState(index)}
      />
    </div>
  );
};

export default Customer;
