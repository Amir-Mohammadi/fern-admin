import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  size?: string;
}

export type SpeakerProps = Props;

const Speaker: React.FC<SpeakerProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 18 17.54"
      {...props}
    >
      <path
        d="M0 5.77v6h4l5 5v-16l-5 5zm13.5 3A4.5 4.5 0 0011 4.74v8.05a4.474 4.474 0 002.5-4.02zM11 0v2.06a7 7 0 010 13.42v2.06A8.994 8.994 0 0011 0z"
        fill={props.color || IconConfig.defaultColor}
      />
    </svg>
  );
};

export default Speaker;