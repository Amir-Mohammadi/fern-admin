import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type ArchiveProps = Props;

const Archive: React.FC<ArchiveProps> = (props) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size ?? IconConfig.defaultSize}
    height={props.size ?? IconConfig.defaultSize}
    viewBox="0 0 9 12"
    {...props}
  >
    <path
      data-name="solid file-upload"
      d="M5.25 3.188V0H.563A.561.561 0 000 .563v10.875A.561.561 0 00.563 12h7.875A.561.561 0 009 11.438V3.75H5.813a.564.564 0 01-.563-.562zM6.778 8.25H5.25v1.875a.375.375 0 01-.375.375h-.75a.375.375 0 01-.375-.375V8.25H2.222a.375.375 0 01-.264-.641l2.26-2.243a.4.4 0 01.563 0l2.26 2.243a.375.375 0 01-.263.641zm2.058-5.789L6.541.164A.562.562 0 006.143 0H6v3h3v-.143a.561.561 0 00-.164-.396z"
      fill={props.color ?? IconConfig.defaultColor}
    />
  </svg>
  );
};

export default Archive;
