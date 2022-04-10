import React, {useState} from 'react';
import styles from '../../customer-services-management.module.scss';

import AccordionList from '../../../../components/accordion-list';
import UserPanelRequestList from '../../../../components/forms/user-panel-request-list';

interface Props {}

export type OnlineChatProps = Props;

const OnlineChat: React.FC<OnlineChatProps> = (props) => {
  const [state, setState] = useState(0);
  return (
    <div className={styles.magContainer}>
      <AccordionList
        data={[
          {
            title: 'لیست درخواست های رسیده از طرف کاربران پنل خریداران ',
            content: (
              <UserPanelRequestList
                talkingList={[
                  {
                    username: 'کاربر 2154',
                    time: '14:25',
                    status: 'offline',
                    desc: 'ممنون',
                  },
                  {
                    username: 'کاربر 2154',
                    time: '14:25',
                    status: 'offline',
                    desc: 'ممنون',
                  },
                  {
                    username: 'کاربر 2154',
                    time: '14:25',
                    status: 'offline',
                    desc: 'ممنون',
                  },
                ]}
                waitingList={[
                  {
                    username: 'کاربر 2154',
                    time: '14:25',
                    status: 'offline',
                    desc: 'ممنون',
                  },
                  {
                    username: 'کاربر 2154',
                    time: '14:25',
                    status: 'offline',
                    desc: 'ممنون',
                  },
                  {
                    username: 'کاربر 2154',
                    time: '14:25',
                    status: 'offline',
                    desc: 'ممنون',
                  },
                ]}
              />
            ),
          },
          {
            title: 'لیست اپراتورهای موجود ',
            content: <div>لیست اپراتورهای موجود </div>,
          },
          {title: 'چت روم ', content: <div>چت روم </div>},
        ]}
        selectedIndex={state}
        onClick={(i) => {
          setState(i);
        }}
      />
    </div>
  );
};

export default OnlineChat;
