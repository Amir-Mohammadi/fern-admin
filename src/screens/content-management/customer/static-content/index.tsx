import React, {useState} from 'react';
import styles from '../../content-management.module.scss';

import AccordionList from '../../../../components/accordion-list';
import LogoManagement from '../../../../components/forms/logo-management';

interface Props {}

export type StaticContentProps = Props;

const StaticContent: React.FC<StaticContentProps> = (props) => {
  const [state, setState] = useState(0);
  return (
    <div className={styles.magContainer}>
      <AccordionList
        data={[
          {title: 'لوگو', content: <LogoManagement/>},
          {title: 'درباره‌ی ما ', content: <div>درباره‌ی ما </div>},
          {title: 'تماس با ما ', content: <div>تماس با ما </div>},
          {
            title: 'اسلایدرها ',
            content: <div>اسلایدرها </div>,
          },
          {
            title: 'لینک سایر وب‌سایت‌ها ',
            content: <div>لینک سایر وب‌سایت‌ها </div>,
          },
          {title: 'شعارها ', content: <div>شعارها </div>},
          {title: 'گواهی‌نامه‌ها ', content: <div>گواهی‌نامه‌ها </div>},
          {title: 'شبکه‌های اجتماعی ', content: <div>شبکه‌های اجتماعی </div>},
          {
            title: 'لینک های صفحات مهم ',
            content: <div>لینک های صفحات مهم </div>,
          },
          {title: 'لیست ارزها', content: <div>لیست ارزها</div>},
          {title: 'لیست زبان ها ', content: <div>لیست زبان ها </div>},
        ]}
        selectedIndex={state}
        onClick={(i) => {
          setState(i);
        }}
      />
    </div>
  );
};

export default StaticContent;
