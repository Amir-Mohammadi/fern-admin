import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './send-message-form.module.scss';
import DropDown from '../dropdown';
import TextEditor from '../text-editor';
import classNames from 'classnames';

export enum Target {
  SELECT_GROUP = 'SELECT-GROUP',
  TEXT_EDITOR = 'TYPE-TEXT-IN-TEXT-EDITOR',
  SENDED = 'sended',
}

interface Props {
  title: string;
  categories: {title: string}[];
  text: string;
  action: (target: Target, value?: any) => void;
}

export type SendMessageFormProps = Props;

const SendMessageForm: React.FC<SendMessageFormProps> = (props) => {
  // let categories = [{title: 'فروشندگان جدید'}, {title: 'همه فروشندگان'}];

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.row}>
          <div
            className={classNames({
              [styles.inputGroup]: true,
              [styles.titleInput]: true,
            })}>
            <div className={styles.title}>
              <span>عنوان </span>
              <FontAwesomeIcon icon={faQuestionCircle} color={'#009289'} />
            </div>
            <input type="text" value={props.title} />
          </div>
          <div
            className={classNames({
              [styles.inputGroup]: true,
              [styles.categoryInput]: true,
            })}>
            <div className={styles.title}>
              <span>دسته </span>
              <FontAwesomeIcon icon={faQuestionCircle} color={'#009289'} />
            </div>
            <DropDown
              option={props.categories}
              onSelect={(i: number) => {
                props.action(Target.SELECT_GROUP);
              }}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <div className={styles.title}>
              <span>شرح کامل</span>
              <FontAwesomeIcon icon={faQuestionCircle} color={'#009289'} />
            </div>
            <div className={styles.textBox}>
              <TextEditor
                value={props.text}
                onChange={() => props.action(Target.TEXT_EDITOR)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.buttonGroup}>
          <button
            className={styles.success}
            onClick={() => props.action(Target.SENDED)}>
            ارسال
          </button>
        </div>
      </div>
    </div>
  );
};
export default SendMessageForm;
