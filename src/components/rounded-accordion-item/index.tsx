import React from 'react';
import Rounded1 from './solid-rounded';
import Rounded2 from './colored-rounded';

interface props {
  title: string;
  toggle: boolean;
  setToggle: () => void;
  content: any;
  type: RoundedTypes;
  badgeNumber?: number;
}
export enum RoundedTypes {
  SolidRounded,
  ColoredRounded,
}
export type RoundedAccordionItemProps = props;

const RoundedAccordionItems: React.FC<RoundedAccordionItemProps> = (props) => {
  switch (props.type) {
    case RoundedTypes.SolidRounded:
      return <Rounded1 {...props} />;
    case RoundedTypes.ColoredRounded:
      return <Rounded2 {...props} />;

    default:
      return null;
  }
};
export default RoundedAccordionItems;
