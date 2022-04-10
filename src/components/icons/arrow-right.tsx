import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type ArrowRightProps = Props;

const ArrowRight: React.FC<ArrowRightProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 3.548 5.682"
      {...props}>
      <path
        data-name="Path 2146"
        d="M.354 5.328l2.487-2.487L.354.353"
        fill={props.color || IconConfig.defaultColor}
        stroke={props.secondColor || IconConfig.defaultColor}
      />
    </svg>
  );
};

export default ArrowRight;
