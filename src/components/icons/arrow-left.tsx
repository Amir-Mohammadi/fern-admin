import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type ArrowLeftProps = Props;

const ArrowLeft: React.FC<ArrowLeftProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 3.547 5.682">
      <path
        id="Path_2147"
        data-name="Path 2147"
        d="M0,2.486,2.487,0,4.975,2.486"
        transform="translate(0.707 5.328) rotate(-90)"
        fill={props.color || IconConfig.defaultColor}
        stroke={props.secondColor || IconConfig.defaultColor}
        stroke-width="1"
      />
    </svg>
  );
};

export default ArrowLeft;
