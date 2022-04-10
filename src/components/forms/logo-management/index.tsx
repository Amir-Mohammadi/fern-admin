import React, {useState} from 'react';
import RoundedAccordionItems, {
  RoundedTypes,
} from '../../rounded-accordion-item';
import Dataset from '../../main-categories-dataset';

import styles from './logo-management.module.scss';

interface props {}

export type LogoManagementProps = props;

const LogoManagement: React.FC<LogoManagementProps> = (props) => {
  const [toggle, setToggle] = useState<'create' | 'list' | 'new' | 'none'>(
    'none',
  );
  return (
    <div className={styles.container}>
      <RoundedAccordionItems
        type={RoundedTypes.SolidRounded}
        title={'ایجاد سردسته جدید'}
        toggle={toggle == 'create'}
        setToggle={() =>
          toggle == 'create' ? setToggle('none') : setToggle('create')
        }
        content={createCategoryForm()}
      />
      <RoundedAccordionItems
        type={RoundedTypes.SolidRounded}
        title={'لیست سردسته های موجود'}
        toggle={toggle == 'list'}
        setToggle={() =>
          toggle == 'list' ? setToggle('none') : setToggle('list')
        }
        content={categoryList()}
      />
      <RoundedAccordionItems
        type={RoundedTypes.SolidRounded}
        title={'ایجاد لوگوی جدید'}
        toggle={toggle == 'new'}
        setToggle={() =>
          toggle == 'new' ? setToggle('none') : setToggle('new')
        }
        content={createLogoForm()}
      />
    </div>
  );
};

export default LogoManagement;

const createCategoryForm = () => (
  <div className={styles.categoryContainer}>
    <div className={styles.inputGroup}>
      <span>عنوان</span>
      <input type="text" />
    </div>
    <div className={styles.buttonGroup}>
      <button className={styles.danger}>لغو</button>
      <button className={styles.success}>ثبت</button>
    </div>
  </div>
);

const categoryList = () => (
  <div className={styles.listContainer}>
    <Dataset
      list={[]}
      search={{value: '', onChange: () => {}}}
      action={() => {}}
    />
  </div>
);

const createLogoForm = () => (
  <div className={styles.logoContainer}>
    <div className={styles.row}>
      <div className={styles.inputGroup}>
        <span>عنوان لوگو</span>
        <input type="text" />
      </div>
      <div className={styles.inputGroup}>
        <span>تصویر لوگو</span>
        <div>
          <input type="text" />
          <input type="file" id="file" />

          <label htmlFor="file">انتخاب</label>
        </div>
      </div>
    </div>
    <div className={styles.row}>
      <div className={styles.inputGroup}>
        <span>سردسته لوگو</span>
        <input type="text" />
      </div>
      <div className={styles.inputGroup}>
        <span>لینک لوگو</span>
        <input type="text" />
      </div>
    </div>
    <div className={styles.row}>
      <div className={styles.buttonGroup}>
        <button className={styles.danger}>لغو</button>
        <button className={styles.success}>بارگذاری</button>
      </div>
    </div>
  </div>
);
