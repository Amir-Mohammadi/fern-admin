import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type TickProps = Props;

const Tick: React.FC<TickProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 21.5 21.5"
      {...props}
    >
      <g
        transform="translate(.75 .75)"
        fill={props.color || IconConfig.defaultColor}
        stroke={props.secondColor || IconConfig.defaultColor}
        strokeLinecap="round"
        strokeWidth={1.5}
      >
        <path
          data-name="Path 9"
          d="M4.56 10.85l3.06 3.06 7.82-7.82"
          strokeLinejoin="round"
        />
        <circle
          data-name="Ellipse 2"
          cx={10}
          cy={10}
          r={10}
          strokeLinejoin="bevel"
        />
      </g>
    </svg>
  );
};

export default Tick;
