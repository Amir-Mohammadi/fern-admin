import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  secondColor?: Color | string;
  size?: string;
}

export type LanguageProps = Props;

const Language: React.FC<LanguageProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        d="M9.99 0A10 10 0 1020 10 10 10 0 009.99 0zm6.93 6h-2.95a15.649 15.649 0 00-1.38-3.56A8.03 8.03 0 0116.92 6zM10 2.04A14.087 14.087 0 0111.91 6H8.09A14.087 14.087 0 0110 2.04zM2.26 12a7.822 7.822 0 010-4h3.38a16.515 16.515 0 00-.14 2 16.515 16.515 0 00.14 2zm.82 2h2.95a15.649 15.649 0 001.38 3.56A7.987 7.987 0 013.08 14zm2.95-8H3.08a7.987 7.987 0 014.33-3.56A15.649 15.649 0 006.03 6zM10 17.96A14.087 14.087 0 018.09 14h3.82A14.087 14.087 0 0110 17.96zM12.34 12H7.66a14.713 14.713 0 01-.16-2 14.585 14.585 0 01.16-2h4.68a14.585 14.585 0 01.16 2 14.713 14.713 0 01-.16 2zm.25 5.56A15.649 15.649 0 0013.97 14h2.95a8.03 8.03 0 01-4.33 3.56zM14.36 12a16.515 16.515 0 00.14-2 16.515 16.515 0 00-.14-2h3.38a7.822 7.822 0 010 4z"
        fill={props.color || IconConfig.defaultColor}
      />
    </svg>
  );
};

export default Language;
