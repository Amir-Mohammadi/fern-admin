import styles from './tab-bar.module.scss';
import classNames from 'classnames';

interface Props {
  items: TabBarItem[];
  selected: number;
  handleSelect: (i: number) => any;
}

export type TabBarProps = Props;

const TabBar: React.FC<TabBarProps> = (props) => {
  return (
    <div className={styles.container}>
      <ul className={styles.tabBarBox}>{renderTab(props)}</ul>
      <div className={styles.contentBox}>
        {(props.items[props.selected] ?? props.items[0]).content}
      </div>
    </div>
  );
};

export default TabBar;

export type TabBarItem = {
  title: string;
  content?: React.ReactElement;
};

const renderTab = (inputs: TabBarProps) =>
  inputs.items.map((entry, i) => (
    <li
    key={i+"TaBbAr"}
      className={classNames({
        [styles.tab]: true,
        [styles.selectedTab]: inputs.selected == i,
      })}
      onClick={() => inputs.handleSelect(i)}>
      <span>{entry.title}</span>
    </li>
  ));
