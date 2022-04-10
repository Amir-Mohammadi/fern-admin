import {faReply, faVolumeUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {inherits} from 'util';
import Icons, {IconTypes} from '../icons';
import styles from './login.module.scss';

export enum Target {
  USERNAME = 'forget-form-username',
  EMAIL = 'forget-form-email',
  CAPTCHA = 'forgot-from-captcha',
  SUBMIT = 'forgot-form-submit',
}
interface Props {
  username: string;
  email: string;
  captcha: string;
  captchaUrl?: string;
  action: (target: Target, value?: string ) => void;
}

export type ForgetProps = Props;

const Forget: React.FC<ForgetProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.forgetHead}>
        <span>بازیابی رمز عبور</span>
      </div>
      <div className={styles.forgetInfo}>
        <input
          type="text"
          placeholder={'نام کاربری'}
          value={props.username}
          onChange={({target}) => props.action(Target.USERNAME, target.value)}
        />

        <input
          type="text"
          placeholder={'ایمیل'}
          value={props.email}
          onChange={({target}) => props.action(Target.EMAIL, target.value)}
        />
      </div>
      <div className={styles.forgetCaptcha}>
        <input
          type="text"
          placeholder={'عبارت امنیتی'}
          value={props.captcha}
          onChange={({target}) => props.action(Target.CAPTCHA, target.value)}
        />
        <input
          type="text"
          placeholder={'code'}
          style={{width: '133px', marginLeft: '3px'}}
        />
        <div
          className={styles.buttons}
          style={{display: 'flex', flexDirection: 'column'}}>
          <span>
            <FontAwesomeIcon icon={faReply} color={'#000000'} />
          </span>
          <span>
            <FontAwesomeIcon icon={faVolumeUp} color={'#000000'} />
          </span>
        </div>
      </div>

      <div className={styles.forgetGetButton}>
        <button onClick={() => props.action(Target.SUBMIT)}>{'ادامه'}</button>
      </div>
    </div>
  );
};

export default Forget;
