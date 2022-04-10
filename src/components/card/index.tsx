import React from 'react';
import styles from './card.module.scss';

interface Props {
  title: string;
}
export type CardProps = Props;

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <span>{props.title}</span>
      </div>
      <div className={styles.body}>{props.children}</div>
    </div>
  );
};

export default Card;
