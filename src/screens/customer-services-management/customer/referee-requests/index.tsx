import React, {useState} from 'react';
import styles from '../../customer-services-management.module.scss';

import AccordionList from '../../../../components/accordion-list';

interface Props {}

export type RefereeRequestsProps = Props;

const RefereeRequests: React.FC<RefereeRequestsProps> = (props) => {
  const [state, setState] = useState(0);
  return (
    <div className={styles.magContainer}>
      <AccordionList
        data={[
          {
            title: 'لیست درخواست‌های عودت کالا',
            content: <div>لیست درخواست‌های عودت کالا</div>,
          },
        ]}
        selectedIndex={state}
        onClick={(i) => {
          setState(i);
        }}
      />
    </div>
  );
};

export default RefereeRequests;
