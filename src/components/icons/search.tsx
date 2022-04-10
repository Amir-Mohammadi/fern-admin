import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  size?: string;
}

type SearchProps = Props;

const Search: React.FC<SearchProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || IconConfig.defaultSize}
      height={props.size || IconConfig.defaultSize}
      viewBox="0 0 24.379 24.366">
      <path
        id="Path_1802"
        data-name="Path 1802"
        d="M-214.027-42.767a10.875,10.875,0,0,0-.4-14.962,10.9,10.9,0,0,0-15.386,0,10.877,10.877,0,0,0-.2,15.175,10.877,10.877,0,0,0,15.164.607l5.235,5.235a.571.571,0,0,0,.413.169.6.6,0,0,0,.413-.169.579.579,0,0,0,.17-.41.579.579,0,0,0-.17-.41Zm-8.092,2.443a9.713,9.713,0,0,1-9.523-7.819,9.712,9.712,0,0,1,5.81-10.866,9.712,9.712,0,0,1,11.791,3.578,9.712,9.712,0,0,1-1.208,12.262A9.669,9.669,0,0,1-222.119-40.324Z"
        transform="translate(233.001 60.909)"
        fill={props.color || IconConfig.defaultColor}
      />
    </svg>
  );
};

export default Search;
