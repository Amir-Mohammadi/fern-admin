import styles from './product-request.module.scss';

import {
  faCheck,
  faEdit,
  faEye,
  faPlus,
  faShareSquare,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';

export enum Target {
  REFERENCE,
  ACCEPT,
  DECLINE,
}

export type RowProduct = {
  id?: number;
  stuffName?: string;
  stuffBrand?: string;
  seller?: string;
  category?: string;
  purchaseStatus?: string;
  dateTime?: string;
  messageTitle?: string;
  group?: string;
};
interface Props {
  table: {
    header: string[];
    rowProduct: RowProduct[];
  };
  action: (target: Target, value?: any) => void;
}

export type ProductRequestProps = Props;

const ProductRequest: React.FC<ProductRequestProps> = (props) => {
  const [state, setState] = useState(0);
  return (
    <div className={styles.container}>
      <table className={styles.mainTable}>
        <thead>
          <tr>
            {props.table.header.map((toggle, i) => (
              <th key={i}> {toggle}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.table.rowProduct.map((item, i) => (
            <>
              <tr>
                <td key={i}>{item}</td>
                <td className={styles.editButton}>
                  <button>
                    <FontAwesomeIcon icon={faShareSquare} color={'#FFFFFF'} />
                    <span>ارجاع</span>
                  </button>
                  <span onClick={(e) => setState(1)}>
                    <FontAwesomeIcon icon={faPlus} color={'#707070'} />
                  </span>
                </td>
              </tr>
              {state == i ? RenderPage() : null}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductRequest;

const RenderPage = () => {
  return (
    <tr className={styles.renderPage}>
      <td colSpan={7}>
        <div className={styles.rightSide}>
          <span>پاسخ</span>
          <input type="text" />
        </div>
      </td>
      <td>
        <div className={styles.leftSide}>
          <button className={styles.acceptButton}>
            <FontAwesomeIcon icon={faCheck} color={'#ffffff'} />
            <span>تایید</span>
          </button>
          <button className={styles.deniedButton}>
            <FontAwesomeIcon icon={faTimesCircle} color={'#ffffff'} />
            <span>عدم تایید</span>
          </button>
        </div>
      </td>
    </tr>
  );
};
