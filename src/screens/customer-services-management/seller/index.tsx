import React, {useState} from 'react';
import styles from '../customer-services-management.module.scss';

import VerticalTabBar from '../../../components/vertical-tab-bar';

import OrdersList, {OrderListProps} from './orders-list';
import CargoList from './cargo-list';
import RefereesList from './referees-list';
import ElesellMessagesList, {
  ElesellMessagesListProps,
} from './elesell-messages-list';
import QuestionsList from './questions-list';
import CreateProductRequest from './create-product-request-list';

interface Props {
  orderListProps: OrderListProps;
  eleselMessage: ElesellMessagesListProps;
}

export type SellerProps = Props;

const Seller: React.FC<SellerProps> = (props) => {
  const [state, setState] = useState(0);
  return (
    <div className={styles.tabContainer}>
      <VerticalTabBar
        items={[
          {
            title: 'لیست سفارش‌های مشتریان ',
            content: <OrdersList {...props.orderListProps} />,
          },
          {
            title: 'لیست محموله‌ها ',
            content: <CargoList />,
          },
          {
            title: 'لیست مرجوعی‌ها ',
            content: <RefereesList />,
          },
          {
            title: ' لیست پیام‌های ارسالی از طرف السل ',
            content: <ElesellMessagesList {...props.eleselMessage} />,
          },
          {
            title: 'لیست پرسش‌ها ',
            content: <QuestionsList />,
          },
          {
            title: 'لیست درخواست‌های درج محصول ',
            content: <CreateProductRequest />,
          },
        ]}
        selectedIndex={state}
        setSelectedIndex={(index) => setState(index)}
      />
    </div>
  );
};

export default Seller;
