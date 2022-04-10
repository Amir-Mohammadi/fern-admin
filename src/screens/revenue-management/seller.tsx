import React, {useEffect, useState} from 'react';
import ListAccordion, {ListItem} from '../../components/list-accordion';
import PriceRange, {
  PriceRangeProps,
  Target as PriceRangeFormTarget,
} from '../../components/price-range';

import styles from './revenue-management.module.scss';

export enum Target {
  FORM_LOAD = 'seller-form-load',
  SELLER_BILL_SEARCH = 'seller-bill-search',
  PRODUCT_SEARCH = 'product-search',
  SELECTED_PRODUCT_ID = 'set-selected-product-id',
}

type Targets = Target | PriceRangeFormTarget;

interface Props {
  sellerBillSearchValue: string;
  productSearchValue: string;
  productList: Array<ListItem>;
  priceRangeForm: PriceRangeProps;
  action: (target: Targets, value?: any) => void;
}

export type searchTypes = 'product' | 'sellerBill';

export type SellerProps = Props;

const Seller: React.FC<SellerProps> = (props) => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(-1);
  useEffect(() => {
    props.action(Target.FORM_LOAD);
    return () => {};
  }, []);
  return (
    <div className={styles.tabContainer}>
      <div className={styles.column}>
        <div className={styles.box}>
          <ListAccordion
            title={'لیست صورتحساب‌های فروشندگان'}
            list={[
              {title: 'صورتحساب‌ 12648234'},
              {title: 'صورتحساب‌ 12648234'},
            ]}
            content={<div>صورتحساب</div>}
            onToggle={() => {}}
            selectedIndex={1}
            search={{
              value: props.sellerBillSearchValue,
              onChange: (v) => {
                props.action(Target.SELLER_BILL_SEARCH, v);
              },
            }}
          />
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.box}>
          <ListAccordion
            title={'لیست محصولات'}
            list={props.productList}
            content={
              <ProductPriceRange
                {...props.priceRangeForm}
                action={props.action}
              />
            }
            onToggle={(i) => {
              setSelectedProductIndex(i);
              props.action(Target.SELECTED_PRODUCT_ID, i);
            }}
            selectedIndex={selectedProductIndex}
            search={{
              value: props.productSearchValue,
              onChange: (v) => {
                props.action(Target.PRODUCT_SEARCH, v);
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Seller;

const ProductPriceRange = (props: PriceRangeProps) => (
  <div className={styles.rangeBox}>
    <PriceRange
      {...props}
      action={(target, value) => props.action(target, value)}
    />
  </div>
);
