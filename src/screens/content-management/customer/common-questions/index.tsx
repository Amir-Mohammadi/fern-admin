import React, {useState} from 'react';
import styles from '../../content-management.module.scss';

import AccordionList from '../../../../components/accordion-list';

interface Props {}

export type StaticContentProps = Props;

const CommonQuestions: React.FC<StaticContentProps> = (props) => {
  const [state, setState] = useState(0);
  return (
    <div className={styles.magContainer}>
      <AccordionList
        data={[
          {
            title: 'لیست پرسش های متداول مشتریان فروشگاه',
            content: <div>لیست پرسش های متداول مشتریان فروشگاه</div>,
          },
          {
            title: 'افزودن پرسش و پاسخ جدید',
            content: <div>افزودن پرسش و پاسخ جدید</div>,
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

export default CommonQuestions;
