import React from 'react';
import style from './colored-rounded.module.scss';
import Icons, {IconTypes} from '../icons';

interface props {
  title: string;
  toggle: boolean;
  setToggle: (status: boolean) => void;
  content: any;
}
export type ColoredRoundedProps = props;

const ColoredRounded: React.FC<ColoredRoundedProps> = (props) => {
  return (
    <div className={style.container}>
      <div
        className={style.title}
        onClick={() => props.setToggle(props.toggle === true ? false : true)}>
        <div className={style.myIcon}>
          {props.toggle === true ? (
            <Icons type={IconTypes.Rounded} color={'#009289'} size={'14.5px'} />
          ) : (
            <Icons type={IconTypes.Rounded} color={'#808080'} size={'14.5px'} />
          )}
          {props.toggle === true ? (
            <span style={{color: '#009289'}}>{props.title}</span>
          ) : (
            <span style={{color: '#707070'}}>{props.title}</span>
          )}
        </div>
        <div className={style.icon}>
          {props.toggle === true ? (
            <Icons type={IconTypes.ZoomMinus} color={'#707070'} size={'10px'} />
          ) : (
            <Icons type={IconTypes.ZoomPlus} color={'#707070'} size={'10px'} />
          )}
        </div>
      </div>
      {props.toggle === true ? (
        <div className={style.panel}>{props.content}</div>
      ) : null}
    </div>
  );
};
export default ColoredRounded;
