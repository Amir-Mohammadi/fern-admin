import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type DownProps = Props;

const Down: React.FC<DownProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 8.631 14.767"
      {...props}
    >
      <g data-name="Group 974" fill={props.color || IconConfig.defaultColor} stroke={props.secondColor || IconConfig.defaultColor} strokeWidth={0.8}>
        <path
          data-name="Path 854"
          d="M.306 9.468l4.112 4.891c0 .221 3.9-4.891 3.9-4.891"
        />
        <path data-name="Path 855" d="M4.48 0v14.127" />
      </g>
    </svg>
  );
};

export default Down;