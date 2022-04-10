import styles from './coloredHeaderCard.module.scss';
import React from 'react';
import Icons, {IconTypes} from '../icons';

interface Props {
  title: string;
  search: {
    value: string;
    onChange: (value: string) => void;
  };
}

export type ColoredHeaderProps = Props;

const ColoredHeader: React.FC<ColoredHeaderProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{props.title}</span>
        <div className={styles.search}>
          <span>
            <Icons type={IconTypes.Search} size={'9'} />
          </span>
          <input
            type="text"
            value={props.search.value}
            onChange={(i) => props.search.onChange(i.target.value)}
          />
        </div>
      </div>
      <div className={styles.bottom}>{props.children}</div>
    </div>
  );
};

export default ColoredHeader;
