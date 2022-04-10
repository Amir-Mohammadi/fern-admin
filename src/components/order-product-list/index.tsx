import React, {Component} from 'react';
import {faList} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './order-item-list.module.scss';

export enum Target {
  LOAD_ORDER_ITEMS = 'order-items-load-list',
}

export type Row = {
  id: number;
  productId: number;
  productImage: {src: string; title: string; alt: string};
  productName: string;
  productCategoryName: string;
  providerName: string;
  brandName: string;
  productColor: string;
  productPrice: number;
  rowVersion: string | null;
};
interface Props {
  row: Row[];
  orderId?: number;
  loading: boolean;
  error?: string;
  action?: (target: Target, value?: any) => void;
}

export type OrderItemListProps = Props;

class OrderItemList extends Component<OrderItemListProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.action!(Target.LOAD_ORDER_ITEMS, this.props.orderId);
  }

  renderList = () => {
    if (this.props.loading) {
      return (
        <div className={styles.loadingBox}>
          <span>درحال بارگذاری لیست سفارش ها</span>
        </div>
      );
    } else if (this.props.error) {
      return (
        <div className={styles.errorBox}>
          <span>مشکلی در بارگذاری سفارش ها بوجود آمده</span>
          <span>{this.props.error}</span>
          <button
            onClick={() =>
              this.props.action!(Target.LOAD_ORDER_ITEMS, this.props.orderId)
            }>
            تلاش مجدد
          </button>
        </div>
      );
    } else {
      return (
        <table>
          <thead>
            <tr>
              {tableHeader.map((items, i) => (
                <th key={i}>{items}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.row.map((item, i) => (
              <tr className={styles.rowOfProduct}>
                <td>
                  <div className={styles.itemContainer}>
                    <div className={styles.textItem}>
                      <label>{item.id}</label>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.itemContainer}>
                    <div className={styles.imageItem}>
                      <img {...item.productImage} />
                    </div>
                    <div className={styles.textItem}>
                      <label>{item.productName}</label>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.itemContainer}>
                    <div className={styles.textItem}>
                      <label>{item.productCategoryName}</label>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.itemContainer}>
                    <div className={styles.textItem}>
                      <label>{item.providerName}</label>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.itemContainer}>
                    <div className={styles.textItem}>
                      <label>{item.brandName}</label>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.itemContainer}>
                    <div className={styles.textItem}>
                      <label>{item.productColor}</label>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.itemContainer}>
                    <div className={styles.textItem}>
                      <label>{item.productPrice} </label>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <FontAwesomeIcon icon={faList} color={'#707070'} />
          <label>محصولات</label>
        </div>
        <div className={styles.body}>{this.renderList()}</div>
      </div>
    );
  }
}

export default OrderItemList;

const tableHeader: Array<string> = [
  'ردیف',
  'عنوان و کد کالا',
  'گروه کالایی',
  'تامین کننده',
  'برند کالا',
  'رنگ',
  'قیمت',
];
