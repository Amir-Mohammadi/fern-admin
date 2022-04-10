import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  size?: string;
}

export type SecPhraseChangerProps = Props;

const SecPhraseChanger: React.FC<SecPhraseChangerProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 16 20"
      {...props}
    >
      <path d="M8 4V0L3 5l5 5V6a6 6 0 11-6 6H0a8 8 0 108-8z" fill={props.color || IconConfig.defaultColor} />
    </svg>

  
  );
};

export default SecPhraseChanger;