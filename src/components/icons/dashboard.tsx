import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type DashboardProps = Props;

const Dashboard: React.FC<DashboardProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size|| IconConfig.defaultSize}
      height={props.size|| IconConfig.defaultSize}
      viewBox="0 0 21.5 21.5"
      {...props}
    >
      <g
        transform="translate(-1.25 -1.25)"
        fill={props.color|| IconConfig.defaultColor}
        stroke={props.secondColor || IconConfig.defaultColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <rect
          data-name="Rectangle 77"
          width={20}
          height={20}
          rx={2}
          transform="translate(2 2)"
        />
        <path data-name="Line 282" d="M2 10h20" />
        <path data-name="Line 283" d="M14 10v12" />
      </g>
    </svg>
  );
};

export default Dashboard;