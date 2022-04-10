import {useState} from 'react';
import Icons, {IconTypes} from '../icons';
import styles from './accordion.module.scss';

interface Props {
  title: string;
  toggle : boolean
  setToggle : (status : boolean) => void;
}

export type AccordionItemProps = Props;

const AccordionItem: React.FC<AccordionItemProps> = (props) => {
  

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={() => props.setToggle(props.toggle)}>
        <span>{props.title}</span>
        <div className={styles.shift}>
          <Icons
            type={props.toggle ? IconTypes.ShiftDown : IconTypes.ShiftLeft}
            size={'11'}
            color="#009289"
          />
        </div>
      </div>
      {props.toggle ? <div>{props.children}</div> : null}
    </div>
  );
};

export default AccordionItem;
