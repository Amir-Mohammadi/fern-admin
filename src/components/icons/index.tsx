import React from 'react';
import FlashDown from './flash-down';
import Add from './add';
import Archive from './archive';
import ArrowDown from './arrow-down';
import ArrowLeft from './arrow-left';
import ArrowRight from './arrow-right';
import Circle from './circle';
import ContentManage from './content-manage';
import CustomerManage from './customer-manage';
import Dashboard from './dashboard';
import Delete from './delete';
import Dislike from './dislike';
import Down from './down';
import Edit from './edit';
import Exit from './exit';
import IncomeManage from './income-manage';
import Language from './language';
import Like from './like';
import Line from './line';
import Logo from './logo';
import Operation from './operation';
import Reject from './reject';
import Release from './Release';
import Search from './search';
import SecPhraseChanger from './sec-phrase-changer';
import ShiftDown from './shift-down';
import ShiftLeft from './shift-left';
import Speaker from './speaker';
import Statistics from './statistics';
import Tick from './tick';
import Top from './top';
import UserManage from './user-manage';
import ZoomMinus from './zoom-minus';
import ZoomPlus from './zoom-plus';
import VerticalLine from './vertical-line';
import FooterLogo from './footer-logo';
import Rounded from './rounded';

export enum Color {
  primary = '#24AFFF',
  danger = '#DB0060',
  warning = '#FF9124',
  success = '#009289',
  light = '#AAAAAA',
}

interface Props {
  color?: Color | string;
  size?: string; // samples: '12px' '1em' '1rem'
  secondColor?: Color | string;
  type?: IconTypes | ActionType;
}




export enum IconTypes {
  Add,
  ArrowDown,
  ArrowLeft,
  Circle,
  ContentManage,
  CustomerManage,
  Dashboard,
  Dislike,
  Down,
  Exit,
  IncomeManage,
  Language,
  Like,
  Line,
  Logo,
  Operation,
  Reject,
  Search,
  SecPhraseChanger,
  ShiftDown,
  ShiftLeft,
  Speaker,
  Stars,
  Statistics,
  Tick,
  Top,
  UserManage,
  ZoomMinus,
  ZoomPlus,
  ArrowRight,
  FlashDown,
  VerticalLine,
  FooterLogo,
  Delete,
  Edit,
  Archive,
  Release,
  Rounded
}


export enum ActionType {
  Delete = IconTypes.Delete,
  Edit = IconTypes.Edit,
  Archive = IconTypes.Archive,
  Release = IconTypes.Release,
  FlashDown = IconTypes.FlashDown,
  VerticalLine = IconTypes.VerticalLine,
  FooterLogo = IconTypes.FooterLogo,
  Rounded = IconTypes.Rounded,
}

export type IconsProps = Props;

const Icons: React.FC<IconsProps> = (props) => {
  switch (props.type) {
    case IconTypes.Add:
      return <Add {...props} />;
    case IconTypes.ArrowDown:
      return <ArrowDown {...props} />;
    case IconTypes.FlashDown:
      return <FlashDown {...props} />;
    case IconTypes.ArrowLeft:
      return <ArrowLeft {...props} />;
    case IconTypes.ArrowRight:
      return <ArrowRight {...props} />;
    case IconTypes.Circle:
      return <Circle {...props} />;
    case IconTypes.ContentManage:
      return <ContentManage {...props} />;
    case IconTypes.CustomerManage:
      return <CustomerManage {...props} />;
    case IconTypes.Dashboard:
      return <Dashboard {...props} />;
    case IconTypes.Dislike:
      return <Dislike {...props} />;
    case IconTypes.Down:
      return <Down {...props} />;
    case IconTypes.Exit:
      return <Exit {...props} />;
    case IconTypes.IncomeManage:
      return <IncomeManage {...props} />;
    case IconTypes.Language:
      return <Language {...props} />;
    case IconTypes.Like:
      return <Like {...props} />;
    case IconTypes.Line:
      return <Line {...props} />;
    case IconTypes.Logo:
      return <Logo {...props} />;
    case IconTypes.Operation:
      return <Operation {...props} />;
    case IconTypes.Reject:
      return <Reject {...props} />;
    case IconTypes.Search:
      return <Search {...props} />;
    case IconTypes.SecPhraseChanger:
      return <SecPhraseChanger {...props} />;
    case IconTypes.ShiftDown:
      return <ShiftDown {...props} />;
    case IconTypes.ShiftLeft:
      return <ShiftLeft {...props} />;
    case IconTypes.Speaker:
      return <Speaker {...props} />;
    case IconTypes.Statistics:
      return <Statistics {...props} />;
    case IconTypes.Tick:
      return <Tick {...props} />;
    case IconTypes.Top:
      return <Top {...props} />;
    case IconTypes.UserManage:
      return <UserManage {...props} />;
    case IconTypes.FooterLogo:
      return <FooterLogo {...props} />;
    case IconTypes.ZoomMinus:
      return <ZoomMinus {...props} />;
    case IconTypes.ZoomPlus:
      return <ZoomPlus {...props} />;
    case IconTypes.FooterLogo:
      return <FooterLogo {...props} />;
    case IconTypes.Delete || ActionType.Delete:
      return <Delete {...props} />;
    case IconTypes.Edit || ActionType.Edit:
      return <Edit {...props} />;
    case IconTypes.Archive || ActionType.Archive:
      return <Archive {...props} />;
    case IconTypes.Release || ActionType.Release:
      return <Release {...props} />;
    case IconTypes.VerticalLine:
      return <VerticalLine {...props} />;
    case IconTypes.FooterLogo:
      return <FooterLogo {...props} />;
    case ActionType.FooterLogo:
      return <FooterLogo {...props} />;
    case ActionType.Rounded:
      return <Rounded {...props} />;

    default:
      return null;
  }
};

export default Icons;
