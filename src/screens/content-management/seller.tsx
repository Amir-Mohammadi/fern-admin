import React from 'react';
import ListAccordion from '../../components/list-accordion';
import PriceRange, {PriceRangeProps} from '../../components/price-range';

import styles from './content-management.module.scss';

interface Props {
 
}


export type SellerProps = Props ;

const Seller: React.FC<SellerProps> = (props) => {
  return (
    <div className={styles.tabContainer}>
     
    </div>
  );
};

export default Seller;

