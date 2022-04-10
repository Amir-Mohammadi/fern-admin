import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

type ArrowDownProps = Props;

const ArrowDown: React.FC<ArrowDownProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 12.727 7.07"
      {...props}
    >
      <path
        data-name="Path 2003"
        d="M.354.354l6.01 6.01 6.01-6.01"
        fill={props.color || IconConfig.defaultColor}
        stroke={props.secondColor || IconConfig.defaultColor}
      />
    </svg>
  );
};

export default ArrowDown;
