import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

type AddProps = Props;

const Add: React.FC<AddProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? IconConfig.defaultSize}
      height={props.size ?? IconConfig.defaultSize}
      viewBox={`0 0 14 14`}>
      <g id="Group_768" data-name="Group 768" transform="translate(-1507 -675)">
        <line
          id="Line_95"
          y2="14"
          transform="translate(1514.333 675)"
          fill="none"
          stroke={props.color ?? IconConfig.defaultColor}
          strokeWidth="1"
        />
        <line
          id="Line_94"
          data-name="Line 94"
          x2="14"
          transform="translate(1507 682.333)"
          fill="none"
          stroke={props.color ?? IconConfig.defaultColor}
          strokeWidth="1"
        />
      </g>
    </svg>
  );
};

export default Add;
