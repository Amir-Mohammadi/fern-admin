import {useState} from 'react';
import {Color} from '../../constants/color';
import Icons, {IconTypes} from '../icons';
import Logo from '../logo';
import styles from './header.module.scss';
import ClassNames from './';

interface Props {}

export type HeaderProps = Props;

const Header: React.FC<HeaderProps> = (props) => {
  const [categoryShow, setCategoryShow] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.headerRightSide}>
        <div className={styles.headerLogo}>
          <Logo color={Color.danger} secondColor={Color.success} />
        </div>
        <div className={styles.searchStyle}>
          <div className={styles.headerSearch}>
            <Icons type={IconTypes.Search} size={'24'} color="#707070" />
            <input placeholder="در السل جستجو کن…" />
          </div>
        </div>
      </div>
      <div className={styles.headerLeftSide}>
        <div className={styles.secondLogo}>
          <Icons type={IconTypes.Logo} color="#d3d3d3" size={'43'} />
        </div>
        <span></span>
        <div className={styles.languageAndExit}>
          <Icons type={IconTypes.VerticalLine} />
          <a style={{padding: '0px 20px'}} href="#" onClick={() => {}}>
            <span
              style={{
                fontSize: 20,
                fontWeight: 200,
                color: '#707070',
                marginLeft: 10,
              }}>
              Fa
            </span>
            <Icons type={IconTypes.Language} color="#707070" size="20px" />
            <Icons
              type={IconTypes.FlashDown}
              color="#707070"
              secondColor="#707070"
              size="5px"
            />
          </a>
          <Icons type={IconTypes.VerticalLine} />
          <a style={{padding: '0px 20px'}} href="#" onClick={() => {}}>
            <span
              style={{
                fontSize: 20,
                fontWeight: 200,
                color: '#707070',
                marginLeft: 10,
              }}>
              خروج
            </span>
            <Icons type={IconTypes.Exit} color="#707070" size="19px" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
