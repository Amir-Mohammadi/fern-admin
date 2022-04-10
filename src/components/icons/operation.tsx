import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  size?: string;
}

export type OperationProps = Props;

const Operation: React.FC<OperationProps> = (props) => {
  return (
    <svg
      data-name="Group 981"
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 23.991 23.589"
      {...props}
    >
      <g data-name="Group 689">
        <g data-name="Group 686">
          <g data-name="Group 685">
            <path
              data-name="Path 1701"
              d="M18.647 15.266a1.164 1.164 0 00-1.165 1.165v3.661a1.166 1.166 0 01-1.165 1.165H3.5a1.166 1.166 0 01-1.165-1.165V4.941A1.166 1.166 0 013.5 3.776h6.771a1.165 1.165 0 100-2.331H3.5a3.5 3.5 0 00-3.5 3.5v15.147a3.5 3.5 0 003.5 3.5h12.82a3.5 3.5 0 003.5-3.5v-3.661a1.164 1.164 0 00-1.173-1.165z"
              fill={props.color || IconConfig.defaultColor}
            />
          </g>
        </g>
        <g data-name="Group 688">
          <g data-name="Group 687">
            <path
              data-name="Path 1702"
              d="M22.688 1.297a4.486 4.486 0 00-6.3-.01l-7.89 7.89a6.082 6.082 0 00-1.785 4.319v2.608a1.164 1.164 0 001.165 1.165h2.611a6.083 6.083 0 004.32-1.787l7.88-7.88a4.47 4.47 0 00-.001-6.305zm-9.525 12.539a3.766 3.766 0 01-2.674 1.1H9.048v-1.441a3.765 3.765 0 011.1-2.672l5.2-5.2 3.014 3.014zm7.877-7.877l-1.029 1.029-3.014-3.014 1.029-1.029a2.131 2.131 0 013.014 3.014z"
              fill={props.color || IconConfig.defaultColor}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Operation;