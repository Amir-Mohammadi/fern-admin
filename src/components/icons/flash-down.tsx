import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

type FlashDownProps = Props;

const FlashDown: React.FC<FlashDownProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 14.219 7.816">
      <path
        id="Path_1800"
        data-name="Path 1800"
        d="M3767,294.317l-6.756,6.756-6.756-6.756"
        transform="translate(-3753.135 -293.963) "
        fill={props.color || IconConfig.defaultColor}
        stroke={props.secondColor || IconConfig.defaultColor}
        strokeWidth="1"
      />
    </svg>
  );
};

export default FlashDown;
