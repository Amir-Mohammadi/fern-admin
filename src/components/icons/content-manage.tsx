import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type ContentManageProps = Props;

const ContentManage: React.FC<ContentManageProps> = (props) => {
  return (
    <svg
      data-name="Icons / Actions / ic-actions-emultiple-edit"
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ||IconConfig.defaultSize}
      height={props.size ||IconConfig.defaultSize}
      viewBox="0 0 24 24"
      {...props}
    >
      <path data-name="Rectangle 131" fill={props.color || IconConfig.defaultColor} d="M0 0h24v24H0z" />
      <g fill={props.color || IconConfig.defaultColor} stroke={props.secondColor || IconConfig.defaultColor} strokeLinecap="round" strokeWidth={1.5}>
        <path
          data-name="Path 15"
          d="M20.042 11.223v5.7a2 2 0 01-2 2H7.822a2 2 0 01-2-2v-13a2 2 0 012-2h5.9"
          strokeLinejoin="bevel"
        />
        <path
          data-name="Path 16"
          d="M16.832 18.923v1.2a2 2 0 01-2 2H4.622a2 2 0 01-2-2V6.153a2 2 0 012-2h1.2"
          strokeLinejoin="bevel"
        />
        <path
          data-name="Path 17"
          d="M19.402 2.173a1 1 0 00-1.42 0l-6 6h0l-.1 3a.21.21 0 00.23.22l3-.1h0l6-6a1 1 0 00-.01-1.37z"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default ContentManage;