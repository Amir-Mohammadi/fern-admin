import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type EditProps = Props;

const Edit: React.FC<EditProps> = (props) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size ?? IconConfig.defaultSize}
    height={props.size ?? IconConfig.defaultSize}
    viewBox="0 0 11.177 9.934"
    {...props}
  >
    <path
      data-name="solid edit"
      d="M7.813 1.613l1.75 1.75a.19.19 0 010 .268L5.325 7.869l-1.8.2a.377.377 0 01-.417-.417l.2-1.8 4.237-4.239a.19.19 0 01.268 0zm3.144-.444l-.948-.948a.759.759 0 00-1.071 0l-.687.687a.19.19 0 000 .268L10 2.926a.19.19 0 00.268 0l.687-.687a.759.759 0 000-1.071zm-3.5 5.548v1.975H1.242v-6.21H5.7a.239.239 0 00.165-.068l.776-.776a.233.233 0 00-.165-.4H.931A.932.932 0 000 2.171V9a.932.932 0 00.931.931h6.831A.932.932 0 008.694 9V5.94a.233.233 0 00-.4-.165l-.776.776a.239.239 0 00-.066.165z"
      fill={props.color ?? IconConfig.defaultColor}
    />
    </svg>
  );
};

export default Edit;