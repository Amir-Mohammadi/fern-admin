import React, {useState} from 'react';
import AccordionItem from '../../../../components/accordion-item';
import AccordionList from '../../../../components/accordion-list';
import CustomerOrderList, {
  CustomerOrderListProps,
} from '../../../../components/dataset/customer-order-list';
import LoadingDialog from '../../../../components/loading-dialog';
import PopUP, { PopUpProps } from '../../../../components/pop-up';
import styles from '../../customer-services-management.module.scss';

interface Props {
  loading: {
    status: boolean;
    message: string;
  };
  popUp: {status: boolean; data: PopUpProps};
}

export type OrderListProps = Props & CustomerOrderListProps;

const OrderList: React.FC<OrderListProps> = (props) => {
  const [state, setState] = useState(0);
  return (
    <div className={styles.magContainer}>
      <AccordionList
        data={[
          {
            title: 'لیست سفارش‌های مشتریان ',
            content: <CustomerOrderList {...props} />,
          },
        ]}
        selectedIndex={state}
        onClick={(i) => {
          setState(i);
        }}
      />
      {props.loading.status && (
        <LoadingDialog message={props.loading.message} />
      )}

      {props.popUp.status && <PopUP {...props.popUp.data} />}
    </div>
  );
};

export default OrderList;
