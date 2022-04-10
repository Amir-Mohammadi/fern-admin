import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type StatisticsProps = Props;

const Statistics: React.FC<StatisticsProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 21.5 17.5"
      {...props}
    >
      <g
        fill={props.color || IconConfig.defaultColor}
        stroke={props.secondColor || IconConfig.defaultColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path data-name="Line 469" d="M.75 16.75h20" />
        <path
          data-name="Path 366"
          d="M3.75 16.75V4.95a.2.2 0 01.2-.2h2.6a.2.2 0 01.2.2v11.8"
        />
        <path
          data-name="Path 367"
          d="M9.75 16.75V1.02c0-.15.09-.27.2-.27h2.6c.11 0 .2.12.2.27v15.73"
        />
        <path
          data-name="Path 368"
          d="M15.75 16.75V7.9c0-.08.09-.15.2-.15h2.6c.11 0 .2.07.2.15v8.85"
        />
      </g>
    </svg>
  );
};

export default Statistics;