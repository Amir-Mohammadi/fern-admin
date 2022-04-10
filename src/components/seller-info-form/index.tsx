import {useState} from 'react';
import RadioButtonGroup from '../radio-button-group';
import styles from './seller-info-form.module.scss';

export enum Target {
  NAME,
  USERNAME = 'USERNAME',
  PERSONALITY = 'PRSONALITY',
  GENDER = 'GENDER',
  NATURAL_CODE = 'NATURAL-CODE',
  NATURAL_NUMBER = 'NATURAL-NUMBER',
  PASSWORD = 'PASSWORD',
  NEXT_PAGE = 'NEXT-PAGE',
}

interface Props {
  name: string;
  username: string;
  Personality: number;
  gender: number;
  birthDate: string;
  naturalCode: string;
  naturalNumber: string;
  password: string;
  action: (type: Target, value?: string | number) => void;
}

export type SellerInfoFormProps = Props;

const SellerInfoForm: React.FC<SellerInfoFormProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.rightSide}>
        <div className={styles.fullName}>
          <span>نام و نام خانوادگی</span>
          <input
            type="text"
            value={props.name}
            onChange={({target}) => props.action(Target.NAME, target.value)}
          />
        </div>
        <div className={styles.radioButton}>
          <RadioButtonGroup
            label={'نوع فروشنده'}
            options={['حقیقی', 'حقوقی']}
            selected={props.Personality}
            handleSelect={(i: number) => {
              props.action(Target.PERSONALITY, i);
            }}
          />
        </div>
        <div className={styles.birthDate}>
          <span>تاریخ تولد</span>
          <input type="text" value={props.birthDate} />
        </div>
        <div className={styles.cardId}>
          <span>شماره شناسنامه</span>
          <input
            type="text"
            value={props.naturalNumber}
            onChange={({target}) =>
              props.action(Target.NATURAL_NUMBER, target.value)
            }
          />
        </div>
      </div>
      <div className={styles.leftSide}>
        <div className={styles.characterName}>
          <span>نام کاربری</span>
          <input
            type="text"
            value={props.username}
            onChange={({target}) => props.action(Target.USERNAME, target.value)}
          />
        </div>
        <div className={styles.radioButton}>
          <RadioButtonGroup
            label={'جنسیت'}
            options={['مرد', 'زن']}
            selected={props.gender}
            handleSelect={(i: number) => {
              props.action(Target.GENDER, i);
            }}
          />
        </div>
        <div className={styles.codeId}>
          <span>کد ملی</span>
          <input
            type="text"
            value={props.naturalCode}
            onChange={({target}) =>
              props.action(Target.NATURAL_CODE, target.value)
            }
          />
        </div>
        <div className={styles.password}>
          <span>رمز عبور</span>
          <input
            type="password"
            value={props.password}
            onChange={({target}) => props.action(Target.PASSWORD, target.value)}
          />
        </div>
        <div className={styles.setButton}>
          <button onClick={() => props.action(Target.NEXT_PAGE)}>
            <span>صفحه بعد</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerInfoForm;
