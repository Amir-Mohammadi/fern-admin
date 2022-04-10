import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  size?: string;
}

export type ZoomPlusProps = Props;

const ZoomPlus: React.FC<ZoomPlusProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 9.289 9.253"
      {...props}
    >
      <path
        data-name="Combined Shape"
        d="M5.418 9.253V5.398h3.871V3.853H5.418V0H3.87v3.853H0v1.545h3.87v3.855z"
        fill={props.color || IconConfig.defaultColor}
      />
    </svg>
  );
};

export default ZoomPlus;