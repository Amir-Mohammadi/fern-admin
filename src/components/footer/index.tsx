import React from 'react';
import styles from './footer.module.scss';
import Icons , {IconTypes} from '../icons';
interface props {}
export type FooterProps = props;

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.firstText}>پشتیبانی نرم افزار: 041-123456789</div>
      <div className={styles.secondText}>کلیه حقوق این سایت متعلق به شرکت پارلار (فروشگاه آنلاین ال سل) می‌باشد.</div>
      <div className={styles.logo}>
          <Icons type={IconTypes.FooterLogo} />
      </div>
    </div>
  );
};
export default Footer;
