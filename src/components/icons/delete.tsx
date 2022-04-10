import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type DeleteProps = Props;

const Delete: React.FC<DeleteProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? IconConfig.defaultSize}
      height={props.size ?? IconConfig.defaultSize}
      viewBox="0 0 9.78 11.177"
      {...props}>
      <path
        data-name="solid trash-alt"
        d="M.7 10.129a1.048 1.048 0 001.048 1.048h6.286a1.048 1.048 0 001.048-1.048V2.794H.7zm5.937-5.588a.35.35 0 11.7 0v4.89a.35.35 0 01-.7 0zm-2.1 0a.35.35 0 11.7 0v4.89a.35.35 0 01-.7 0zm-2.1 0a.35.35 0 11.7 0v4.89a.35.35 0 01-.7 0zM9.431.7h-2.62L6.606.29A.524.524 0 006.137 0h-2.5a.518.518 0 00-.467.29L2.969.7H.349A.349.349 0 000 1.048v.7a.349.349 0 00.349.352h9.082a.349.349 0 00.349-.349v-.7A.349.349 0 009.431.7z"
        fill={props.color ?? IconConfig.defaultColor}
      />
    </svg>
  );
};

export default Delete;
