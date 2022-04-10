import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type CircleProps = Props;

const Circle: React.FC<CircleProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 9.989 9.989"
      {...props}
    >
      <g fill={props.color || IconConfig.defaultColor} stroke={props.color || IconConfig.defaultColor} strokeWidth={2}>
        <circle cx={4.995} cy={4.995} r={4.995} stroke="none" />
        <circle cx={4.995} cy={4.995} r={3.995} fill={props.secondColor || IconConfig.defaultColor} />
      </g>
    </svg>
  );
};

export default Circle;