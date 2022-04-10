import React from 'react';
import Icons, {IconTypes} from '../icons';
import styles from './alert.module.scss';

interface Props {
  text: string;
}

export type AlertProps = Props;

const Alert: React.FC<AlertProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.contain}>
        <span className={styles.text}>{props.text}</span>
      </div>
    </div>
  );
};

export default Alert;
