import React from 'react';
import DataSet, {DataSetProps} from '../../components/dataset';

import styles from './user-management.module.scss';

interface Props {
  customerList: DataSetProps;
  memberList: DataSetProps;
}

export type CustomerProps = Props;

const Customer: React.FC<CustomerProps> = (props) => {
  return (
    <div className={styles.tabContainer}>
      <div className={styles.dataSetFormBX}>
        <div className={styles.dataSet}>
          <DataSet {...props.customerList} />
        </div>
      </div>
      <div className={styles.dataSetFormBX}>
        <div className={styles.dataSet}>
          <DataSet {...props.memberList} />
        </div>
      </div>
    </div>
  );
};

export default Customer;
