import React from 'react';
import {
  faReply,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './login.module.scss';

export enum Target {
  USERNAME = 'login-form-username',
  PASSWORD = 'login-form-password',
  CAPTCHA = 'login-from-captcha',
  REMEMBER_ME = 'login-from-remember-me',
  FORGOT_PASS='login-from-forgot-pass',
  SUBMIT = 'login-form-submit',
}
interface Props {
  username: string;
  password: string;
  captcha: string;
  rememberMe: boolean;
  captchaUrl?: string;
  action: (
    target: Target,
    value?: string | boolean,
  ) => void;
  
}

export type LoginProps = Props;

const Login: React.FC<LoginProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.svg}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={120.643}
            height={116.617}
            viewBox="0 0 120.643 116.617">
            <g data-name="Group 592" fill="#d3d3d3">
              <path
                data-name="Path 1826"
                d="M108.911 68.696A55.281 55.281 0 100 55.296 55.142 55.142 0 0017.949 96.03l-.051.051 1.786 1.51c.118.089.237.169.355.267.96.794 1.954 1.55 2.963 2.276.325.237.639.47.962.687a55.644 55.644 0 003.311 2.121c.244.138.49.273.736.422 1.237.7 2.494 1.365 3.788 1.974a2.946 2.946 0 01.278.128 54.8 54.8 0 0013.37 4.232c.129.017.246.038.373.068 1.455.246 2.928.453 4.419.579.185.02.364.03.549.05 1.484.117 2.986.2 4.507.2a54.851 54.851 0 0019.106-3.426 26.124 26.124 0 1034.51-38.468zM4.027 55.296a51.268 51.268 0 11101.261 11.389.363.363 0 01-.107-.038 27.837 27.837 0 00-2.328-.915c-.067-.017-.138-.048-.206-.068a24.8 24.8 0 00-2.523-.7l-.128-.03a24.626 24.626 0 00-2.552-.422c-.06 0-.118-.02-.179-.02a25.521 25.521 0 00-2.756-.146 26.167 26.167 0 00-25.105 18.919 4.417 4.417 0 01-1.4-3.24v-5.95a29 29 0 001.237-1.641 40.627 40.627 0 005.263-10.3 7.314 7.314 0 004.191-6.618v-7.128a7.362 7.362 0 00-1.776-4.763V34.24a16.263 16.263 0 00-3.791-11.79c-3.7-4.223-9.7-6.374-17.829-6.374s-14.129 2.152-17.83 6.374a16.261 16.261 0 00-3.791 11.79v9.385a7.34 7.34 0 00-1.777 4.763v7.128a7.315 7.315 0 002.691 5.675 37.708 37.708 0 006.213 12.841v5.821a4.482 4.482 0 01-2.334 3.939l-15.9 8.668a14.7 14.7 0 00-1.51.963A51.167 51.167 0 014.028 55.29zm47.457 51.112c-.215-.01-.439-.03-.655-.049a50.456 50.456 0 01-3.812-.47c-.047 0-.1-.021-.147-.021a52.5 52.5 0 01-7.854-1.962c-.067-.02-.137-.05-.207-.07a51.5 51.5 0 01-7.236-3.1c-.136-.077-.274-.138-.4-.205a54.736 54.736 0 01-3.043-1.778c-.294-.186-.578-.362-.862-.55q-1.373-.9-2.7-1.885c-.087-.068-.176-.135-.264-.206.068-.038.128-.079.2-.108l15.895-8.679a8.48 8.48 0 004.438-7.463v-7.243l-.473-.56a33.427 33.427 0 01-6.027-12.5l-.186-.794-.688-.443a3.344 3.344 0 01-1.542-2.8v-7.128a3.285 3.285 0 011.12-2.466l.668-.6v-11.2l-.02-.254a12.088 12.088 0 012.808-8.769c2.907-3.318 7.884-5 14.807-5 6.881 0 11.859 1.668 14.765 4.958a12.324 12.324 0 012.849 8.807l-.021 11.466.668.6a3.3 3.3 0 011.12 2.456v7.128a3.33 3.33 0 01-2.375 3.171l-1 .3-.324 1a37.237 37.237 0 01-5.018 10.115 21.791 21.791 0 01-1.482 1.912l-.5.562v7.442a8.436 8.436 0 004.565 7.53 26.16 26.16 0 00-.178 2.925c0 .589.021 1.17.06 1.758l.058.618c.021.188.041.384.06.57s.029.372.059.55c.048.342.108.677.176 1.021.04.226.07.461.108.687l.01.03c.01.058.03.118.041.176.067.3.135.581.215.875.048.206.089.4.136.608.05.176.119.344.168.519.069.237.139.463.217.7.048.136.087.285.135.43.138.4.307.806.463 1.2 0 .01 0 .01.01.02.119.294.247.6.382.892l.3.649c.071.147.128.294.2.432.05.087.1.176.147.273.169.325.355.649.531.963.057.1.107.2.158.284a50.509 50.509 0 01-16.7 2.828c-1.277 0-2.544-.058-3.812-.157zm43.025 6.2a22.1 22.1 0 01-17.907-9.181c-.169-.224-.314-.461-.474-.7-.108-.155-.226-.314-.323-.48-.089-.138-.167-.276-.255-.422s-.167-.294-.256-.452c-.138-.247-.294-.48-.422-.727-.087-.186-.177-.372-.264-.56a1.044 1.044 0 01-.07-.156c-.156-.314-.315-.628-.45-.953-.07-.168-.119-.344-.188-.51-.156-.4-.314-.808-.449-1.219-.06-.187-.108-.383-.169-.579a1.048 1.048 0 00-.048-.176c-.108-.405-.216-.807-.314-1.209-.021-.128-.05-.254-.07-.382s-.047-.246-.079-.375a32.566 32.566 0 01-.206-1.344.831.831 0 00-.02-.155c-.011-.169-.038-.335-.058-.5a23.03 23.03 0 01-.1-2.041c0-.637.039-1.255.087-1.875.058-.6.139-1.209.248-1.844l.155-.875a21.957 21.957 0 0124.3-17.347c.206.027.4.068.608.1a20.731 20.731 0 012.178.441c.149.039.307.07.453.118a22.357 22.357 0 015.1 2.131 22.106 22.106 0 01-11.013 41.275zm0 0"
              />
              <path
                data-name="Path 1827"
                d="M111.563 88.77l-1.9-.361a2.6 2.6 0 01-1.613-4.1l1.2-1.637a1.326 1.326 0 00-.129-1.716l-2.594-2.588a1.319 1.319 0 00-1.669-.156l-1.615 1.085a2.6 2.6 0 01-4.031-1.762l-.311-2a1.311 1.311 0 00-1.3-1.115h-3.657a1.314 1.314 0 00-1.3 1.07l-.478 2.464a2.61 2.61 0 01-4.019 1.665l-2.077-1.407a1.314 1.314 0 00-1.671.162l-2.587 2.586a1.312 1.312 0 00-.135 1.718l1.2 1.631a2.607 2.607 0 01-1.607 4.1l-1.91.368a1.312 1.312 0 00-1.069 1.3v3.657a1.312 1.312 0 001.116 1.3l2.005.311a2.61 2.61 0 011.761 4.038l-1.09 1.605a1.324 1.324 0 00.161 1.678l2.587 2.587a1.323 1.323 0 001.716.129l1.631-1.194a2.547 2.547 0 012.49-.329 2.579 2.579 0 011.608 1.936l.367 1.908a1.314 1.314 0 001.3 1.063H97.6a1.311 1.311 0 001.3-1.114l.22-1.407a2.6 2.6 0 014.114-1.71l1.15.846a1.324 1.324 0 001.716-.129l2.587-2.594a1.318 1.318 0 00.161-1.672l-1.089-1.612a2.6 2.6 0 011.76-4.031l2-.311a1.321 1.321 0 001.123-1.3v-3.665a1.327 1.327 0 00-1.078-1.3zm-1.567 3.825l-.884.136a5.251 5.251 0 00-3.542 8.13l.478.7-1.019 1.02-.23-.174a5.247 5.247 0 00-8.291 3.432l-.044.29h-1.432l-.162-.84a5.248 5.248 0 00-8.258-3.238l-.716.529-1.012-1.02.476-.7a5.251 5.251 0 00-3.547-8.13l-.885-.136v-1.431l.838-.16a5.244 5.244 0 003.238-8.258l-.521-.717 1.012-1.012 1.174.793a5.249 5.249 0 008.1-3.354l.266-1.394h1.432l.142.883a5.236 5.236 0 008.123 3.542l.708-.47 1.015 1.012-.531.717a5.252 5.252 0 003.246 8.258l.833.16zm0 0"
              />
              <path
                data-name="Path 1828"
                d="M95.461 84.99a6.606 6.606 0 106.606 6.607 6.616 6.616 0 00-6.606-6.607zm0 10.567a3.96 3.96 0 113.968-3.96 3.96 3.96 0 01-3.968 3.96zm0 0"
              />
            </g>
          </svg>
        </div>
        <span>???????? ???? ?????? ??????????</span>
      </div>
      <div className={styles.info}>
        <input
          type="text"
          placeholder={'?????? ????????????'}
          value={props.username}
          onChange={({target}) => props.action(Target.USERNAME, target.value)}
        />

        <input
          type="password"
          placeholder={'?????? ????????'}
          value={props.password}
          onChange={({target}) => props.action(Target.PASSWORD, target.value)}
        />
      </div>
      <div className={styles.captcha}>
        <input
          type="text"
          placeholder={'?????????? ????????????'}
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
      <div className={styles.remember}>
        <input
          type="checkbox"
          checked={props.rememberMe}
          onChange={({target}) => props.action(Target.REMEMBER_ME, target.value)}
        />
        <span>?????? ???? ???????? ??????????</span>
      </div>
      <div className={styles.continue}>
        <button onClick={() => props.action(Target.SUBMIT)}>{'??????????'}</button>
      </div>
      <div className={styles.forget}>
        <a
          onClick={() => {
            props.action(Target.FORGOT_PASS);
          }}>
          {'???????? ???????? ???? ???????????? ???????? ??????'}
        </a>
      </div>
    </div>
  );
};

export default Login;
