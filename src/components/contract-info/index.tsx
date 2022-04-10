import React from 'react';
import Icons, {IconTypes} from '../icons';
import styles from './contract-info.module.scss';

export enum Target {
  CODE = 'CODE',
  PATH = 'PATH',
  CREATE_DATE = 'CREATE-DATE',
  FINISH_DATE = 'FINISH-DATE',
  SET_INFO = 'SET-INFO',
}
interface Props {
  contractCode: string;
  contractPath: string;
  createDate: string;
  finishDate: string;
  action: (target: Target, value?: any) => void;
}

export type ContractInfoProps = Props;

const ContractInfo: React.FC<ContractInfoProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label>{'شماره قرارداد'}</label>
          <input
            value={props.contractCode}
            onChange={({target}) => {
              props.action(Target.CODE, target.value);
            }}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>{'فایل قرارداد'}</label>

          <input
            value={props.contractPath}
            onChange={({target}) => {
              props.action(Target.PATH, target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label>{'تاریخ شروع قرارداد'}</label>

          <input
            value={props.createDate}
            onChange={({target}) => {
              props.action(Target.CREATE_DATE, target.value);
            }}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>{'تاریخ پایان قرارداد'}</label>

          <input
            value={props.finishDate}
            onChange={({target}) => {
              props.action(Target.FINISH_DATE, target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.contain}>
        <button
          onClick={() => {
            props.action(Target.SET_INFO);
          }}>
          {' ثبت اطلاعات'}
        </button>
      </div>
    </div>
  );
};

export default ContractInfo;
