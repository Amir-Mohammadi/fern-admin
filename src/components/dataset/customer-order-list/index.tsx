import React, {useEffect, useRef, useState} from 'react';
import {faEdit, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import OrderDetailDialog, {
  OrderDetailDialogProps,
  Target as orderDetailTargets,
} from '../../order-detail-dialog';

import OrderItemList, {
  OrderItemListProps,
  Target as OrderItemListTarget,
} from '../../order-item-list';

import styles from './customer-order-list.module.scss';

export enum orderListTargets {
  FORM_LOAD = 'customer-order-list-form-load',
  ON_CHANGE = 'ON_CHANGE',
}

export type Targets =
  | orderListTargets
  | orderDetailTargets
  | OrderItemListTarget;

export type Row = {
  id: number;
  customerName: string;
  customerEmail: string;
  totalPrice: number;
  createdAt: string | null;
  rowVersion: string | null;
};
interface Props {
  rows: Row[];
  productList: OrderItemListProps;
  informationDialog: OrderDetailDialogProps;
  action?: (target: Targets, value?: any) => void;
}

export type CustomerOrderListProps = Props;
const CustomerOrderList: React.FC<CustomerOrderListProps> = (props) => {
  useEffect(() => {
    props.action(orderListTargets.FORM_LOAD);
    return () => {};
  }, []);

  const [rowToggle, setRowToggle] = useState(-1);

  return (
    <div className={styles.container}>
      {props.rows.length ? (
        <table className={styles.mainTable}>
          <thead>
            <tr>
              {tableHeader.map((items, i) => (
                <th key={i}>
                  <span>{items}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.rows.map((item, i) => (
              <>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.customerName}</td>
                  <td>{item.customerEmail}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.totalPrice}</td>

                  <td className={styles.editButton}>
                    <button onClick={() => {}}>
                      <FontAwesomeIcon icon={faEdit} color={'#FFFFFF'} />
                      <span>ویرایش</span>
                    </button>
                    <span
                      onClick={(e) => {
                        if (rowToggle === i) {
                          setRowToggle(-1);
                        } else {
                          setRowToggle(i);
                        }
                      }}>
                      {i == rowToggle ? (
                        <FontAwesomeIcon icon={faMinus} color={'#707070'} />
                      ) : (
                        <FontAwesomeIcon icon={faPlus} color={'#707070'} />
                      )}
                    </span>
                  </td>
                </tr>

                {rowToggle == i ? RenderPage(props, item.id) : null}
              </>
            ))}
          </tbody>
        </table>
      ) : (
        <div> سفارشی برای نمایش وجود ندارد</div>
      )}
    </div>
  );
};

export default CustomerOrderList;

const RenderPage = (props: CustomerOrderListProps, orderId: number) => {
  return (
    <tr className={styles.render}>
      <td colSpan={tableHeader.length} className={styles.renderPage}>
        <div className={styles.toggleBoard}>
          <OrderDetailDialog
            {...props.informationDialog}
            orderId={orderId}
            action={(target, value) => props.action(target, value)}
          />
          <OrderItemList
            {...props.productList}
            orderId={orderId}
            action={(target, value) => {
              props.action(target, value);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

const tableHeader: Array<string> = [
  'سفارش',
  'نام خریدار',
  'ایمیل خریدار',
  'ایجاد شده در',
  'تمام سفارش ها',
  '',
];
