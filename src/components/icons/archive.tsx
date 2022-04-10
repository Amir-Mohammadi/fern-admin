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
    viewBox="0 0 13.714 12"
    {...props}
  >
    <path
      data-name="solid archive"
      d="M.857 11.143a.856.856 0 00.857.857H12a.856.856 0 00.857-.857V3.429h-12zm4.286-5.679a.322.322 0 01.321-.321H8.25a.322.322 0 01.321.321v.214A.322.322 0 018.25 6H5.464a.322.322 0 01-.321-.321zM12.857 0h-12A.856.856 0 000 .857v1.286a.43.43 0 00.429.429h12.857a.43.43 0 00.429-.429V.857A.856.856 0 0012.857 0z"
      fill={props.color ?? IconConfig.defaultColor}
    />
  </svg>
  );
};

export default Archive;
