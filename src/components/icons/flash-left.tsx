import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  size?: string;
}

type FlashLeftProps = Props;

const FlashLeft: React.FC<FlashLeftProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 6 11"
      {...props}
    >
      <path data-name="Polygon 10" d="M0 5.5L6 0v11z" fill={props.color || IconConfig.defaultColor} />
    </svg>
  );
};

export default FlashLeft;
