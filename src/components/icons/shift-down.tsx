import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  size?: string;
}

export type ShiftDownProps = Props;

const ShiftDown: React.FC<ShiftDownProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ||IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 11 6"
      {...props}
    >
      <path data-name="Polygon 22" d="M5.5 6L0 0h11z" fill={props.color || IconConfig.defaultColor} />
    </svg>
  );
};

export default ShiftDown;