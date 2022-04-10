import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  size?: string;
}

export type ZoomMinusProps = Props;

const ZoomMinus: React.FC<ZoomMinusProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 9.289 1.542"
      {...props}
    >
      <path data-name="Rectangle 45" fill={props.color || IconConfig.defaultColor} d="M0 0h9.289v1.542H0z" />
    </svg>
  );
};

export default ZoomMinus;