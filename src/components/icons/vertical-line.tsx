import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type VerticalLineProps = Props;

const VerticalLine: React.FC<VerticalLineProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={3}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 3 99"
      {...props}
    >
      <path
        data-name="Line 604"
        fill={props.color || IconConfig.defaultColor}
        stroke={props.secondColor || IconConfig.defaultColor}
        strokeWidth={3}
        d="M1.5 99V0"
      />
    </svg>
  );
};

export default VerticalLine;