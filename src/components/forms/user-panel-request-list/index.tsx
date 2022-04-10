import React, {useState} from 'react';
import RoundedAccordionItems, {
  RoundedTypes,
} from '../../rounded-accordion-item';
import OperatorListItem, {
  OperatorListItemProps,
} from '../../../components/operator-list-item';

import styles from './user-panel-request-list.module.scss';

interface Props {
  waitingList: OperatorListItemProps[];
  talkingList: OperatorListItemProps[];
}

export type UserPanelRequestListProps = Props;

const UserPanelRequestList: React.FC<UserPanelRequestListProps> = (props) => {
  const [toggle, setToggle] = useState<'waiting' | 'talking' | 'none'>('none');
  return (
    <div className={styles.container}>
      <RoundedAccordionItems
        type={RoundedTypes.SolidRounded}
        title={'در انتظار پاسخ'}
        toggle={toggle == 'waiting'}
        badgeNumber={props.waitingList.length}
        setToggle={() =>
          toggle == 'waiting' ? setToggle('none') : setToggle('waiting')
        }
        content={waitingList(props.waitingList)}
      />
      <RoundedAccordionItems
        type={RoundedTypes.SolidRounded}
        title={'در حال مکالمه'}
        toggle={toggle == 'talking'}
        badgeNumber={props.talkingList.length}
        setToggle={() =>
          toggle == 'talking' ? setToggle('none') : setToggle('talking')
        }
        content={talkingList(props.talkingList)}
      />
    </div>
  );
};

export default UserPanelRequestList;

const waitingList = (list: OperatorListItemProps[]) => (
  <div className={styles.listContainer}>
    {list.map((operator, i) => (
      <OperatorListItem {...operator} key={i + 'UsErPaNeLlIsT'} />
    ))}
  </div>
);

const talkingList = (list: OperatorListItemProps[]) => (
  <div className={styles.listContainer}>
    {list.map((operator, i) => (
      <OperatorListItem {...operator} key={i + 'UsErPaNeLlIsT'} />
    ))}
  </div>
);
