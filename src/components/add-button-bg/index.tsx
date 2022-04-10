import styles from './add.module.scss';
import React from 'react';
import Icons, {IconTypes} from '../icons';

interface Props {
  title: string;
  onClick: (e: any) => void;
}

export type AddButtonBGProps = Props;

const AddButtonBG: React.FC<AddButtonBGProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>{props.title}</span>
      </div>
      <div className={styles.icon}>
        <button onClick={() => props.onClick(() => {})}>
          <Icons type={IconTypes.Add} size={'25px'} color={'#FFFFFF'} />
        </button>
      </div>
    </div>
  );
};

export default AddButtonBG;
