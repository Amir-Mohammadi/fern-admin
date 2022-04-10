import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  size?: string;
}

export type RoundedProps = Props;

const Rounded: React.FC<RoundedProps> = (props) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || IconConfig.defaultSize}
    height={props.size || IconConfig.defaultSize}
    viewBox="0 0 14.548 14.548"
    {...props}
  >
    <path
      data-name="solid info-circle"
      d="M7.274 0a7.274 7.274 0 107.274 7.274A7.275 7.275 0 007.274 0zm0 3.226a1.232 1.232 0 11-1.232 1.232 1.232 1.232 0 011.232-1.232zm1.643 7.45a.352.352 0 01-.352.352H5.984a.352.352 0 01-.352-.352v-.7a.352.352 0 01.352-.352h.352V7.743h-.352a.352.352 0 01-.352-.352v-.7a.352.352 0 01.352-.352h1.877a.352.352 0 01.352.352v2.933h.352a.352.352 0 01.352.352z"
      fill={props.color || IconConfig.defaultColor}
    />
  </svg>
  );
};

export default Rounded;
