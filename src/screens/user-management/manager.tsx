import React from 'react';
import styles from './user-management.module.scss';

import AddNewUserForm, {
  AddNewUserFormProps,
} from '../../components/add-new-user';
import DataSet, {DataSetProps} from '../../components/dataset';

interface Props {
  addNewUserForm: AddNewUserFormProps;
  dataSet: DataSetProps;
}

export type ManagerProps = Props;

const Manager: React.FC<ManagerProps> = (props) => {
  return (
    <div className={styles.tabContainer}>
      <div className={styles.newUserFormBX}>
        <AddNewUserForm {...props.addNewUserForm} />
      </div>
      <div className={styles.dataSetFormBX}>
        <div className={styles.dataSet}>
          <DataSet {...props.dataSet} />
        </div>
      </div>
    </div>
  );
};

export default Manager;
