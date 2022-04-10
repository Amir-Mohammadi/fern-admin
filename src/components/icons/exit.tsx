import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  size?: string;
}

type ExitProps = Props;

const Exit: React.FC<ExitProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 19 16.196"
      {...props}
    >
      <g data-name="Group 931" fill={props.color || IconConfig.defaultColor}>
        <path
          data-name="Path 1721"
          d="M5.197 4.206a.722.722 0 01-.2.495L2.389 7.494h9.843a.725.725 0 010 1.45H2.395l2.607 2.793a.725.725 0 01-1.06.99L.195 8.714l-.016-.019-.02-.024-.023-.031-.017-.025-.02-.033-.015-.027-.017-.034-.01-.03-.013-.035-.01-.031-.009-.036-.007-.032-.006-.041v-.028-.07-.098l.002-.039.008-.035.008-.032.012-.033.011-.03.015-.033.014-.03.018-.032.017-.028.021-.03.019-.029.025-.029.013-.015 3.747-4.014a.725.725 0 011.255.495z"
        />
        <path
          data-name="Path 1722"
          d="M6.188 15.471V11.6a.725.725 0 111.45 0v3.143h9.912V1.45H7.639v3.143a.725.725 0 11-1.45 0V.725A.725.725 0 016.913 0h11.362A.725.725 0 0119 .725v14.746a.725.725 0 01-.725.729H6.913a.725.725 0 01-.725-.729z"
        />
      </g>
    </svg>
  );
};

export default Exit;
