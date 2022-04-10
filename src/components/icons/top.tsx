import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type TopProps = Props;

const Top: React.FC<TopProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 8.631 14.767"
      {...props}
    >
      <g data-name="Group 625" fill={props.color || IconConfig.defaultColor} stroke={props.secondColor || IconConfig.defaultColor} strokeWidth={0.8}>
        <path
          data-name="Path 854"
          d="M.306 5.299L4.418.408c0-.221 3.9 4.891 3.9 4.891"
        />
        <path data-name="Path 855" d="M4.48 14.768V.641" />
      </g>
    </svg>
  );
};

export default Top;
