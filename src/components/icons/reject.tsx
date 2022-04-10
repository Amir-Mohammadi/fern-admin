import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type RejectProps = Props;

const Reject: React.FC<RejectProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 14.841 14.841"
      {...props}
    >
      <g
        fill={props.color || IconConfig.defaultColor}
        stroke={props.secondColor || IconConfig.defaultColor}
        strokeLinecap="round"
        strokeLinejoin="bevel"
        strokeWidth={1.5}
      >
        <path data-name="Line 14" d="M13.781 13.781L1.061 1.061" />
        <path data-name="Line 15" d="M13.781 1.061l-12.72 12.72" />
      </g>
    </svg>
  );
};

export default Reject;