import React from 'react';
import styles from './solid-rounded.module.scss';
import Icons, {IconTypes} from '../icons';

interface props {
  title: string;
  toggle: boolean;
  setToggle: () => void;
  content: any;
  badgeNumber?: number;
}
export type SolidRoundedProps = props;

const SolidRounded: React.FC<SolidRoundedProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleBX} onClick={() => props.setToggle()}>
        <div className={styles.title}>
          <span>{props.title}</span>
          {props.badgeNumber ? (
            <div className={styles.badge}>{props.badgeNumber}</div>
          ) : null}
        </div>
        <div className={styles.icon}>
          {props.toggle === true ? (
            <Icons
              type={IconTypes.ZoomMinus}
              color={'#009289'}
              size={'27.5px'}
            />
          ) : (
            <Icons
              type={IconTypes.ZoomPlus}
              color={'#009289'}
              size={'27.5px'}
            />
          )}
        </div>
      </div>
      {props.toggle === true ? (
        <div className={styles.panel}>{props.content}</div>
      ) : null}
    </div>
  );
};
export default SolidRounded;
