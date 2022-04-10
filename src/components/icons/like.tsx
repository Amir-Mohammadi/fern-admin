import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type LikeProps = Props;

const Like: React.FC<LikeProps> = (props) => {
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
        d="M16.65 18h-6.24A3.388 3.388 0 018 17a3.393 3.393 0 00-2.362-.951H5v-8h.894A1.988 1.988 0 007.59 7.11l1.22-2a4.035 4.035 0 011.9-1.6l.43-.17a2 2 0 001.15-1.22l.6-1.78a.5.5 0 01.47-.34h.14A1.5 1.5 0 0115 1.5v.39a4.168 4.168 0 01-.45 2L13 7h5a2 2 0 012 2v2.84a6.016 6.016 0 01-.43 2.229L18.5 16.74A1.993 1.993 0 0116.65 18zM2.5 17h-2a.5.5 0 01-.5-.5v-9A.5.5 0 01.5 7h2a.5.5 0 01.5.5v9a.5.5 0 01-.5.5z"
        fill={props.color || IconConfig.defaultColor}
      />
    </svg>
  );
};

export default Like;
