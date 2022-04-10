import React from 'react';
import Icons, {IconTypes} from '../icons';
import styles from './operator-list-item.module.scss';

interface Props {
  avatar?: string;
  username: string;
  status: 'online' | 'offline';
  time: string;
  desc: string;
}

export type OperatorListItemProps = Props;

const OperatorListItem: React.FC<OperatorListItemProps> = (props) => (
  <div className={styles.container}>
    <div className={styles.avatarBX}>
      <div className={styles.avatar}>
        {props.avatar ? (
          <img src={props.avatar} />
        ) : (
          <Icons type={IconTypes.Logo} size={'34px'} color={'#D3D3D3'} />
        )}
      </div>
      {props.status == 'online' ? <div className={styles.badge}></div> : null}
    </div>

    <div className={styles.descBX}>
      <div className={styles.titleBX}>
        <div className={styles.title}>{props.username}</div>
        <span>{props.time}</span>
      </div>
      <div className={styles.desc}>{props.desc}</div>
    </div>
  </div>
);

export default OperatorListItem;
