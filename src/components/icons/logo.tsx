import React from 'react';
import {Color} from '../../constants/color';
import {IconConfig} from '../../constants/config';

interface Props {
  color?: Color | string;
  size?: string;
}

export type LogoProps = Props;

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? IconConfig.defaultSize}
      height={props.size ?? IconConfig.defaultSize}
      viewBox="0 0 27.013 26.889"
      {...props}>
      <g data-name="Group 879">
        <path
          data-name="Path 1933"
          d="M15.289 18.949a2.985 2.985 0 01-2.377-.963 3.054 3.054 0 01-.738-2.09V5.351h2.664v10.381a.842.842 0 00.943.963h1.021v2.254z"
          fill={props.color ?? IconConfig.defaultColor}
        />
        <path
          data-name="Path 1934"
          d="M2.651 11.593a2.083 2.083 0 002.336 2.377 3.3 3.3 0 002.418-1l1.619 1.578a5.806 5.806 0 01-1.722 1.25 5.708 5.708 0 01-2.336.431 6.416 6.416 0 01-1.845-.246 4.3 4.3 0 01-1.578-.861 4.293 4.293 0 01-1.107-1.681 7.858 7.858 0 01-.41-2.685 5.921 5.921 0 011.291-4.037 4.26 4.26 0 013.361-1.414A4.338 4.338 0 018.121 6.76a5.368 5.368 0 011.209 3.648v1.185zm4.058-1.824a3.078 3.078 0 00-.246-1.148A1.787 1.787 0 004.68 7.514a1.786 1.786 0 00-1.783 1.107 3.065 3.065 0 00-.246 1.148z"
          fill={props.color ?? IconConfig.defaultColor}
        />
        <path
          data-name="Path 1935"
          d="M20.307 11.593a2.083 2.083 0 002.336 2.377 3.3 3.3 0 002.418-1l1.619 1.578a5.809 5.809 0 01-1.721 1.25 5.708 5.708 0 01-2.336.431 6.413 6.413 0 01-1.844-.246 4.3 4.3 0 01-1.578-.861 4.294 4.294 0 01-1.107-1.681 7.863 7.863 0 01-.41-2.685 5.922 5.922 0 011.291-4.037 4.261 4.261 0 013.361-1.414 4.338 4.338 0 013.443 1.455 5.369 5.369 0 011.209 3.648v1.185zm4.058-1.824a3.077 3.077 0 00-.246-1.148 1.786 1.786 0 00-1.783-1.107 1.786 1.786 0 00-1.783 1.107 3.064 3.064 0 00-.246 1.148z"
          fill={props.color ?? IconConfig.defaultColor}
        />
        <g data-name="Group 872">
          <g data-name="Group 868">
            <path
              data-name="Path 1942"
              d="M22.333 3.614a.884.884 0 01-.884-.884V.884A.884.884 0 0122.333 0a.884.884 0 01.884.884V2.73a.884.884 0 01-.884.884z"
              fill={props.color ?? IconConfig.defaultColor}
            />
          </g>
          <g data-name="Group 871">
            <g data-name="Group 869">
              <path
                data-name="Path 1943"
                d="M19.843 4.01a.881.881 0 01-.625-.259l-1.306-1.306a.884.884 0 010-1.25.884.884 0 011.25 0l1.306 1.306a.884.884 0 010 1.25.882.882 0 01-.625.259z"
                fill={props.color ?? IconConfig.defaultColor}
              />
            </g>
            <g data-name="Group 870">
              <path
                data-name="Path 1944"
                d="M24.823 4.067a.882.882 0 01-.625-.259.884.884 0 010-1.25l1.306-1.305a.884.884 0 011.25 0 .884.884 0 010 1.25l-1.305 1.306a.882.882 0 01-.626.258z"
                fill={props.color ?? IconConfig.defaultColor}
              />
            </g>
          </g>
        </g>
        <g data-name="Group 877">
          <g data-name="Group 873">
            <path
              data-name="Path 1945"
              d="M4.68 3.614a.884.884 0 01-.884-.884V.884A.884.884 0 014.68 0a.884.884 0 01.884.884V2.73a.884.884 0 01-.884.884z"
              fill={props.color ?? IconConfig.defaultColor}
            />
          </g>
          <g data-name="Group 876">
            <g data-name="Group 874">
              <path
                data-name="Path 1946"
                d="M2.19 4.01a.881.881 0 01-.625-.259L.259 2.445a.884.884 0 010-1.25.884.884 0 011.25 0l1.306 1.306a.884.884 0 010 1.25.882.882 0 01-.625.259z"
                fill={props.color ?? IconConfig.defaultColor}
              />
            </g>
            <g data-name="Group 875">
              <path
                data-name="Path 1947"
                d="M7.17 4.067a.882.882 0 01-.625-.259.884.884 0 010-1.25l1.306-1.305a.884.884 0 011.25 0 .884.884 0 010 1.25L7.796 3.809a.882.882 0 01-.626.258z"
                fill={props.color ?? IconConfig.defaultColor}
              />
            </g>
          </g>
        </g>
        <path
          data-name="Path 1948"
          d="M26.15 23.459a23.422 23.422 0 01-8.515 3.146 22.943 22.943 0 01-8.9-.337 22.516 22.516 0 01-7.952-3.632q-.257-.185-.508-.377a.402.402 0 01.465-.656q.255.157.514.306a21.214 21.214 0 007.8 2.656 20.772 20.772 0 008.055-.5 20.393 20.393 0 007.037-3.42 1.791 1.791 0 012.461.236 1.735 1.735 0 01-.3 2.475q-.07.053-.144.1z"
          fill={props.color ?? IconConfig.defaultColor}
        />
      </g>
    </svg>
  );
};

export default Logo;
