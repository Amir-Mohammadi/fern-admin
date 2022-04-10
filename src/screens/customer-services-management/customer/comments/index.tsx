import React, {useState} from 'react';
import styles from '../../customer-services-management.module.scss';

import AccordionList from '../../../../components/accordion-list';

interface Props {}

export type CommentsProps = Props;

const Comments: React.FC<CommentsProps> = (props) => {
  const [state, setState] = useState(0);
  return (
    <div className={styles.magContainer}>
      <AccordionList
        data={[
          {
            title: 'لیست نظرات ',
            content: <div>لیست نظرات </div>,
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

export default Comments;
