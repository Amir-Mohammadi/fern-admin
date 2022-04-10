import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type HorizontalLineProps = Props;

const HorizontalLine: React.FC<HorizontalLineProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={1}
      viewBox="0 0 72 1"
      {...props}
    >
      <path data-name="Line 605" fill={props.color || IconConfig.defaultColor} stroke={props.secondColor || IconConfig.defaultColor} d="M0 .5h72" />
    </svg>
  );
};

export default HorizontalLine;