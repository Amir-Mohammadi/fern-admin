import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  size?: string;
}

export type DislikeProps = Props;

const Dislike: React.FC<DislikeProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 20 18"
      {...props}
    >
      <path
        data-name="Icon color"
        d="M6.64 18H6.5A1.5 1.5 0 015 16.48v-.37a4.157 4.157 0 01.45-2L7 11H2a2 2 0 01-2-2V6.16a6.035 6.035 0 01.43-2.23L1.5 1.26A1.991 1.991 0 013.35 0h6.24A3.387 3.387 0 0112 1a3.434 3.434 0 002.41 1H15v7.95h-.9a1.988 1.988 0 00-1.695.94l-1.22 2a4.029 4.029 0 01-1.9 1.6l-.43.17a2 2 0 00-1.145 1.22l-.6 1.78a.5.5 0 01-.47.34zm12.86-7h-2a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v9a.5.5 0 01-.5.5z"
        fill={props.color || IconConfig.defaultColor}
      />
    </svg>
  );
};

export default Dislike;
