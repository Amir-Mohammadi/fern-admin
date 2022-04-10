import React, {useEffect} from 'react';
import {
  faInfoCircle,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './order-detail-dialog.module.scss';

export enum Target {
  FORM_LOAD = 'order-detail-form-load',
  DECLINE_ORDER = 'decline',
  CHANGE_STATUS = 'change',
  SIGN_FOR_PAYMENT = 'sign',
}
interface Props {
  orderId: number;
  customerName: string;
  customerEmail: string;
  address: string;
  province: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  telNumber: string;
  paymentTrackingCode: string;
  createdAt: string;

  action?: (target: Target, value?: any) => void;
}

export type OrderDetailDialogProps = Props;

const OrderDetailDialog: React.FC<OrderDetailDialogProps> = (props) => {
  useEffect(() => {
    props.action(Target.FORM_LOAD, props.orderId);
    return () => {};
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FontAwesomeIcon icon={faInfoCircle} color={'#707070'} />
        <label>اطلاعات</label>
      </div>
      <div className={styles.body}>
        <div className={styles.itemContainer}>
          <div className={styles.detailItem}>
            <div className={styles.title}>
              <label>سفارش: </label>

              {/*<FontAwesomeIcon icon={faQuestionCircle} color={'#009289'} />*/}
            </div>

            <div className={styles.value}>
              <label>{props.orderId}</label>
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.title}>
              <label>ایجاد شده در: </label>

              {/*<FontAwesomeIcon icon={faQuestionCircle} color={'#009289'} />*/}
            </div>
            <div className={styles.description}>
              <div className={styles.value}>
                <label>{props.createdAt}</label>
              </div>
            </div>
          </div>

          <div className={styles.detailAction}>
            <button
              className={styles.danger}
              onClick={() => props.action(Target.DECLINE_ORDER)}>
              انصراف از سفارش
            </button>

            <button
              className={styles.success}
              onClick={() => props.action(Target.CHANGE_STATUS)}>
              تغییر وضعیت
            </button>
          </div>
        </div>

        <div className={styles.section}>
          {' '}
          <div className={styles.itemContainer}>
            <div className={styles.detailItem}>
              <div className={styles.title}>
                <label>نام و نام خانوادگی خریدار: </label>

                {/*<FontAwesomeIcon icon={faQuestionCircle} color={'#009289'} />*/}
              </div>
              <div className={styles.description}>
                <div className={styles.value}>
                  <label>{props.customerName}</label>
                </div>
              </div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.title}>
                <label>ایمیل خریدار: </label>

                {/*<FontAwesomeIcon icon={faQuestionCircle} color={'#009289'} />*/}
              </div>
              <div className={styles.description}>
                <div className={styles.value}>
                  <label>{props.customerEmail}</label>
                </div>
              </div>
            </div>
          </div>
          <br />
          <hr />
          <br />
          <div className={styles.itemContainer}>
            <div className={styles.detailItem}>
              <div className={styles.title}>
                <label>استان: </label>

                {/*<FontAwesomeIcon icon={faQuestionCircle} color={'#009289'} />*/}
              </div>
              <div className={styles.description}>
                <div className={styles.value}>
                  <label>{props.province}</label>
                </div>
              </div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.title}>
                <label>شهر: </label>

                {/*<FontAwesomeIcon icon={faQuestionCircle} color={'#009289'} />*/}
              </div>
              <div className={styles.description}>
                <div className={styles.value}>
                  <label>{props.city}</label>
                </div>
              </div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.title}>
                <label>آدرس سفارش: </label>

                {/*<FontAwesomeIcon icon={faQuestionCircle} color={'#009289'} />*/}
              </div>
              <div className={styles.description}>
                <div className={styles.value}>
                  <label>{props.address}</label>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.itemContainer}>
            <div className={styles.detailItem}>
              <div className={styles.title}>
                <label>کد پستی: </label>

                {/*<FontAwesomeIcon icon={faQuestionCircle} color={'#009289'} />*/}
              </div>
              <div className={styles.description}>
                <div className={styles.value}>
                  <label>{props.postalCode}</label>
                </div>
              </div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.title}>
                <label>شماره موبایل: </label>

                {/*<FontAwesomeIcon icon={faQuestionCircle} color={'#009289'} />*/}
              </div>
              <div className={styles.description}>
                <div className={styles.value}>
                  <label>{props.phoneNumber}</label>
                </div>
              </div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.title}>
                <label>تلفن ثابت: </label>

                {/*<FontAwesomeIcon icon={faQuestionCircle} color={'#009289'} />*/}
              </div>
              <div className={styles.description}>
                <div className={styles.value}>
                  <label>{props.telNumber}</label>
                </div>
              </div>
            </div>
          </div>
          <br />
          <hr />
          <br />
          <div className={styles.itemContainer}>
            <div className={styles.detailItem}>
              <div className={styles.title}>
                <label>کد رهگیری پرداخت: </label>

                {/*<FontAwesomeIcon icon={faQuestionCircle} color={'#009289'} />*/}
              </div>
              <div className={styles.description}>
                <div className={styles.value}>
                  <label>{props.paymentTrackingCode}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailDialog;
