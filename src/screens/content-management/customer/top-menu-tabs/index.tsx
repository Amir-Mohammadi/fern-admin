import React from 'react';
import styles from '../../content-management.module.scss';

interface Props {}

export type StaticContentProps = Props;

const TopMenuTabs: React.FC<StaticContentProps> = (props) => {
  return <div className={styles.magContainer}>تب های تاپ منو</div>;
};

export default TopMenuTabs;
