import {faEye, faComment} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './rate-dataset.module.scss';

export type RateDatasetProps = {};
const RateDataset: React.FC<RateDatasetProps> = (props) => (
  <div className={styles.container}>
    <div className={styles.body}>
      <table>
        <thead>
          <tr>
            <th>{''}</th>
            <th>{'مشتری'}</th>
            <th>{'مجموع سفارش'}</th>
            <th>{'تعداد سفارش'}</th>
            <th>{'امتیاز فروشنده'}</th>
            <th>{'مشاهده صورتحساب'}</th>
            <th>{'مشاهده گفتگو'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.itemContainer}>
                <div className={styles.textItem}>
                  <label>1</label>
                </div>
              </div>
            </td>
            <td>
              <div className={styles.itemContainer}>
                <div className={styles.textItem}>
                  <label> کاربر 1</label>
                </div>
              </div>
            </td>
            <td>
              <div className={styles.itemContainer}>
                <div className={styles.textItem}>
                  <label>2000000 ریال</label>
                </div>
              </div>
            </td>

            <td>
              <div className={styles.itemContainer}>
                <div className={styles.textItem}>
                  <label>120</label>
                </div>
              </div>
            </td>
            <td>
              <div className={styles.itemContainer}>
                <div className={styles.textItem}>
                  <label></label>
                </div>
              </div>
            </td>
            <td>
              <div className={styles.itemContainer}>
                <div className={styles.buttonItem}>
                  <FontAwesomeIcon icon={faEye} color={'#FFFFFF'} />
                  <label className={styles.buttonItemTitle}>مشاهده</label>
                </div>
              </div>
            </td>
            <td>
              <div className={styles.itemContainer}>
                <div className={styles.buttonItem}>
                  <FontAwesomeIcon icon={faComment} color={'#FFFFFF'} />
                  <label className={styles.buttonItemTitle}>گفتگو</label>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default RateDataset;
