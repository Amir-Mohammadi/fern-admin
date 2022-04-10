import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type IncomeManageProps = Props;

const IncomeManage: React.FC<IncomeManageProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 21.5 13.18"
      {...props}
    >
      <g
        transform="translate(-1.25 -5.41)"
        fill={props.color ||IconConfig.defaultColor}
        stroke={props.secondColor || IconConfig.defaultColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <rect
          data-name="Rectangle 50"
          width={20}
          height={11.67}
          rx={2}
          transform="translate(2 6.16)"
        />
        <path data-name="Path 142" d="M6 6.16c0 2.21-1.79 4.49-4 4.49h0" />
        <path data-name="Path 143" d="M2 13.27h0c2.21 0 4 2.36 4 4.57" />
        <path data-name="Path 144" d="M18 17.84c0-2.21 1.79-4.57 4-4.57h0" />
        <path data-name="Path 145" d="M22 10.65h0c-2.21 0-4-2.28-4-4.49v.49" />
        <circle
          data-name="Ellipse 31"
          cx={2}
          cy={2}
          r={2}
          transform="translate(10 10)"
        />
      </g>
    </svg>
  
  
  
  );
};

export default IncomeManage;