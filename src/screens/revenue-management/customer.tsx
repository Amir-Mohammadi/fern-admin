import React from 'react';
import ChartCard, {ChartCardProps} from '../../components/chart-card';
import ColoredHeader from '../../components/colored-header-card';
import CouponItem, {CouponItemProps} from '../../components/coupon-item';
import ListAccordion from '../../components/list-accordion';

import styles from './revenue-management.module.scss';

interface Props {
  statistics: ChartCardProps[];
  coupons: CouponItemProps[];
  search: {
    customerBill: string;
    coupon: string;
    onChange: (target: searchTypes, value: string) => void;
  };
}

export type searchTypes = 'customerBill' | 'coupon';

export type CustomerProps = Props;

const Customer: React.FC<CustomerProps> = (props) => {
  return (
    <div className={styles.tabContainer}>
      <div className={styles.column}>
        {props.statistics.map((statistic, i) => (
          <div className={styles.box} key={i + 'ChArT'}>
            <ChartCard
              title={statistic.title}
              data={statistic.data}
              onChangeDateRange={(range) => {
                statistic.onChangeDateRange(range);
              }}
              dateRange={statistic.dateRange}
              labels={statistic.labels}
              type={statistic.type}
            />
          </div>
        ))}
      </div>
      <div className={styles.column}>
        <div className={styles.box}>
          <ListAccordion
            title={'لیست صورتحساب‌های خریداران'}
            list={[
              {title: 'صورتحساب‌ 12648234'},
              {title: 'صورتحساب‌ 12648234'},
            ]}
            content={<div>صورتحساب</div>}
            onToggle={() => {}}
            selectedIndex={1}
            search={{
              value: props.search.customerBill,
              onChange: (v) => {
                props.search.onChange('customerBill', v);
              },
            }}
          />
        </div>
        <div className={styles.box}>
          <ColoredHeader
            title={'بن تخفیف'}
            search={{
              value: props.search.coupon,
              onChange: (v) => {
                props.search.onChange('coupon', v);
              },
            }}>
            <div className={styles.couponBX}>
              <div className={styles.couponFR}></div>
              <div className={styles.couponLS}>
                <label>لیست بن های تخفیف موجود</label>
                {props.coupons.map((coupon, i) => (
                  <CouponItem {...coupon} key={i + 'CoUpOn'} />
                ))}
              </div>
            </div>
          </ColoredHeader>
        </div>
      </div>
    </div>
  );
};

export default Customer;
