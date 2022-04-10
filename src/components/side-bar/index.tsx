import styles from './side-bar.module.scss';
import classNames from 'classnames';
import Icons, {IconTypes} from '../icons';
import {NavLink} from 'react-router-dom';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  userInfo: UserInfo;
  items: Item[];
}

export type SideBarProps = Props;

const SideBar: React.FC<SideBarProps> = (props) => {
  const [active, setActive] = useState(-1);
  return (
    <div className={styles.container}>
      <div className={styles.userInfoBox}>
        <div className={styles.userInfoInnerBox}>
          <div className={styles.avatar}>
            {props.userInfo.avatar ? (
              <img src={props.userInfo.avatar} />
            ) : (
              <Icons
                type={IconTypes.Logo}
                size={'34px'}
                color={'#D3D3D3'}
                secondColor={'#F2F2F2'}
              />
            )}
          </div>
          <div className={styles.userInfoText}>
            <span className={styles.name}>{props.userInfo.name}</span>
            <span className={styles.email}>{props.userInfo.email}</span>
          </div>
        </div>
      </div>

      <div className={styles.itemsBox}>
        {props.items.map((target, i) => (
          <NavLink
          key={i+"SiDeBaR"}
            to={target.path}
            activeClassName={styles.selected}
            className={classNames({
              [styles.singleItem]: true,
            })}
            isActive={(match, location) => {
              if (!match) {
                return false;
              }
              setActive(i);
              return true;
            }}>
            <div
              className={classNames({
                [styles.itemIcon]: true,
              })}>
                <FontAwesomeIcon icon={target.icon} color={active == i ? '#009289' : '#707070'} size={'lg'} />
              {/* <Icons
                type={target.icon}
                size={'25px'}
                color={'transparent'}
                secondColor={active == i ? '#009289' : '#707070'}
              /> */}
            </div>
            <span>{target.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;

export type UserInfo = {
  avatar?: string;
  name: string;
  email: string;
};

export type Item = {
  path: string;
  text: string;
  icon: IconProp;
};
