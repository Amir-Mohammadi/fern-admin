import React from 'react';
import styles from './add-coupon.module.scss';

interface props {
  code?: string;
  rate?: number;
  useCount?: number;
  expireDate?: string;
  onChange: (
    target: 'code' | 'rate' | 'useCount' | 'expireDate',
    value: string,
  ) => void;
  onSubmit: Function;
}

export type AddCouponProps = props;

const AddCoupon: React.FC<AddCouponProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.filterHd}>ثبت بن تخفیف</div>
      <div className={styles.filterBd}>
        <div className={styles.myText} style={{maxWidth: '120px'}}>
          <span>کد تخفیف</span>
          <input
            style={{width: '120px'}}
            value={props.code}
            onChange={(e) => props.onChange('code', e.target.value)}
          />
        </div>
        <div className={styles.myText} style={{maxWidth: '115px'}}>
          <span>درصد تخفیف</span>
          <input
            style={{width: '115px'}}
            value={props.rate}
            onChange={(e) => props.onChange('rate', e.target.value)}
          />
        </div>
        <div className={styles.myText} style={{maxWidth: '127px'}}>
          <span>تعداد قابلیت مصرف</span>
          <input
            style={{width: '127px'}}
            value={props.useCount}
            onChange={(e) => props.onChange('useCount', e.target.value)}
          />
        </div>
        <div className={styles.myText} style={{maxWidth: '95px'}}>
          <span style={{paddingRight: '8px'}}>تاریخ انقضای کد</span>
          <input
            style={{width: '85px'}}
            value={props.expireDate}
            onChange={(e) => props.onChange('expireDate', e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            props.onSubmit();
          }}>
          ثبت
        </button>
      </div>
    </div>
  );
};

export default AddCoupon;
