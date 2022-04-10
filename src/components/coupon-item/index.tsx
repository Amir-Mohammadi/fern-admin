import React, {useState} from 'react';
import styles from './coupon-item.module.scss';
import classNames from 'classnames';

interface Props {
  code?: string;
  rate?: string;
  status?: boolean;
  useCount?: number;
  expireDate?: string;
  onChange: Function;
}

export type CouponItemProps = Props;

const CouponItem: React.FC<CouponItemProps> = (props) => {
  return (
    <div className={styles.container}>
      <table>
        <thead className={styles.header}>
          <tr>
            <th>
              <span>{'کد تخفیف'}</span>
            </th>
            <th>
              <span> {'درصد تخفیف'} </span>
            </th>
            <th>
              <span>{'تعداد قابلیت مصرف'}</span>
            </th>
            <th>
              <span>{'تاریخ انقضای کد'}</span>
            </th>
            <th>
              <span>{'وضعیت بن'}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> {props.code} </td>
            <td>{props.rate}</td>
            <td>{props.useCount}</td>
            <td> {props.expireDate} </td>
            <td>
              {props.status == true ? (
                <button
                  className={styles.green}
                  onClick={() => props.onChange(false)}>
                  <span className={styles.text}> غیر فعال سازی </span>
                </button>
              ) : (
                <button
                  className={styles.red}
                  onClick={() => props.onChange(true)}>
                  <span> فعال سازی</span>
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default CouponItem;
