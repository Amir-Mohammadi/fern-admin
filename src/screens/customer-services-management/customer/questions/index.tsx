import React, {useState} from 'react';
import styles from '../../customer-services-management.module.scss';

import AccordionList from '../../../../components/accordion-list';

interface Props {}

export type QuestionsProps = Props;

const Questions: React.FC<QuestionsProps> = (props) => {
  const [state, setState] = useState(0);
  return (
    <div className={styles.magContainer}>
      <AccordionList
        data={[
          {
            title: 'لیست پرسش‌ها',
            content: <div>لیست پرسش‌ها</div>,
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

export default Questions;
