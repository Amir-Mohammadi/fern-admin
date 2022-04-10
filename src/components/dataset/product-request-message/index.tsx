import {
  faCheck,
  faEdit,
  faMinus,
  faPlus,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import styles from './product-request-message.module.scss';

export enum Target {
  EDIT = 'edit',
  ACCEPT = 'accept',
  DECLINE = 'decline',
}

export type RowProductMessage = {
  id: number;
  dateTime: string;
  messageTitle: string;
  group: string;
};
interface Props {
  answerTitle: string;
  table: {
    header: string[];
    rowProductMessage: RowProductMessage[];
  };
  action: (target: Target, value?: any) => void;
}

export type ProductRequestMessageProps = Props;

const ProductRequestMessage: React.FC<ProductRequestMessageProps> = (props) => {
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
          {props.table.rowProductMessage.map((item, i) => (
            <>
              <tr>
                <td key={i}>{item.id}</td>
                <td key={i}>{item.messageTitle}</td>
                <td key={i}>{item.group}</td>
                <td key={i}>{item.dateTime}</td>
                <td className={styles.editButton}>
                  <button onClick={() => props.action(Target.EDIT)}>
                    <FontAwesomeIcon icon={faEdit} color={'#FFFFFF'} />
                    <span>ویرایش</span>
                  </button>
                  <span onClick={() => setState(i)}>
                    {i == state ? (
                      <FontAwesomeIcon icon={faMinus} color={'#707070'} />
                    ) : (
                      <FontAwesomeIcon icon={faPlus} color={'#707070'} />
                    )}
                  </span>
                </td>
              </tr>
              {state == i ? RenderPage(props) : null}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductRequestMessage;

const RenderPage = (props: ProductRequestMessageProps) => {
  return (
    <tr className={styles.renderPage}>
      <td colSpan={4}>
        <div className={styles.rightSide}>
          <span>پاسخ</span>
          <input type="text" value={props.answerTitle} />
        </div>
      </td>
      <td>
        <div className={styles.leftSide}>
          <button
            className={styles.acceptButton}
            onClick={() => props.action(Target.ACCEPT)}>
            <FontAwesomeIcon icon={faCheck} color={'#ffffff'} />
            <span>تایید</span>
          </button>
          <button
            className={styles.deniedButton}
            onClick={() => props.action(Target.DECLINE)}>
            <FontAwesomeIcon icon={faTimesCircle} color={'#ffffff'} />
            <span>عدم تایید</span>
          </button>
        </div>
      </td>
    </tr>
  );
};
