import React from 'react';
import styles from './vertical-tab-bar.module.scss';
import classNames from 'classnames';

interface Props {
  items: {
    title: string;
    content?: React.ReactElement<any>;
  }[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => any;
}

export type VerticalTabBarProps = Props;

const VerticalTabBar: React.FC<VerticalTabBarProps> = (props) => {
  return (
    <div className={styles.container}>
      <ul className={styles.tabBar}>
        {props.items.map((tab, i) => (
          <li
            onClick={() => {
              props.setSelectedIndex(i);
            }}
            className={classNames({
              [styles.selectedTab]: i == props.selectedIndex,
            })}
            key={i + '_tabBar'}>
            {tab.title}
          </li>
        ))}
      </ul>
      <div className={styles.tabContent}>
        {(props.items[props.selectedIndex] ?? props.items[0]).content}
      </div>
    </div>
  );
};

export default VerticalTabBar;
