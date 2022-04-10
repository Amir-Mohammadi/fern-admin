import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
  
}

export type UserManageProps = Props;

const UserManage: React.FC<UserManageProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 20.672 23.52"
      {...props}
    >
      <g
        transform="translate(-2.078 -.23)"
        fill={props.color || IconConfig.defaultColor}
        stroke={props.secondColor || IconConfig.defaultColor}
        strokeLinecap="round"
        strokeWidth={1.5}
      >
        <path
          data-name="Path 385"
          d="M3 21l.79-2.88C5.1 13.39 8.55 11 12 11"
          strokeLinejoin="round"
        />
        <circle
          data-name="Ellipse 119"
          cx={5}
          cy={5}
          r={5}
          transform="translate(7 .98)"
          strokeLinejoin="bevel"
        />
        <circle
          data-name="Ellipse 120"
          cx={5}
          cy={5}
          r={5}
          transform="translate(12 13)"
          strokeLinejoin="round"
        />
        <path data-name="Line 485" strokeLinejoin="round" d="M15 18h4" />
        <path data-name="Line 486" strokeLinejoin="round" d="M17 16v4" />
      </g>
    </svg>
  );
};

export default UserManage;