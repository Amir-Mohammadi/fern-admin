import React, {useState} from 'react';
import styles from '../../customer-services-management.module.scss';

import AccordionList from '../../../../components/accordion-list';

interface Props {}

export type RatesProps = Props;

const Rates: React.FC<RatesProps> = (props) => {
  const [state, setState] = useState(0);
  return (
    <div className={styles.magContainer}>
      <AccordionList
        data={[
          {
            title: 'لیست امتیازات',
            content: <div>لیست امتیازات</div>,
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

export default Rates;
