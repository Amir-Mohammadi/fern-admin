import React, {useState} from 'react';
import styles from '../../content-management.module.scss';

import AccordionList from '../../../../components/accordion-list';

interface Props {}

export type MagProps = Props;

const Mag: React.FC<MagProps> = (props) => {
  const [state, setState] = useState(0);
  return (
    <div className={styles.magContainer}>
      <AccordionList
        data={[
          {title: 'ایجاد مقاله جدید', content: <div>ایجاد مقاله جدید</div>},
          {title: 'لیست مقاله ها', content: <div>لیست مقاله ها</div>},
          {title: 'ایجاد دسته جدید', content: <div>ایجاد دسته جدید</div>},
          {title: 'لیست دسته ها', content: <div>لیست دسته ها</div>},
        ]}
        selectedIndex={state}
        onClick={(i) => {
          setState(i);
        }}
      />
    </div>
  );
};

export default Mag;
