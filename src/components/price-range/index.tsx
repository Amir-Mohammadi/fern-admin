import React from 'react';
import DropDown from '../dropdown';
import styles from './price-range.module.scss';

export enum Target {
  TO_VALUE = 'price-range-to-value',
  FROM_VALUE = 'price-range-from-value',
  SELLING_PRICE_VALUE = 'price-range-selling-price-value',
  ON_CHANGE_PROVINCE = 'price-range-from-on-change-province',
  ON_CHANGE_CITY = 'price-range-from-on-change-city',
  ON_CHANCE_COLOR = 'price-range-from-on-change-color',
  ON_TOGGLE_IS_PUBLISH = 'price-range-from-on-change-is-publish',
  ON_SUBMIT = 'price-range-on-submit',
}

export type ProvincesList = {id: number; title: string; areaCode: number};
export type CitiesList = {id: number; title: string};
export type ColorsList = {id: number; title: string};
interface Props {
  from: string;
  to: string;
  provincesList: Array<ProvincesList>;
  selectedProvince: number;
  citiesList: Array<CitiesList>;
  selectedCities: number;
  colorList: Array<ColorsList>;
  selectedColor: number;
  isPublished: boolean;
  sellingPrice: string;
  action?: (target: Target, value?: any) => void;
}
export type PriceRangeProps = Props;

const PriceRange: React.FC<PriceRangeProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.filterHD}>ثبت قیمت محصول</div>
      <div className={styles.filterBD}>
        <div className={styles.textBoxs}>
          <div className={styles.groupInput}>
            <span>استان</span>
            <DropDown
              option={props.provincesList}
              selectedIndex={[props.selectedProvince]}
              onSelect={(i: number) => {
                props.action(Target.ON_CHANGE_PROVINCE, i);
              }}
            />
          </div>
          <div className={styles.groupInput}>
            <span>شهر</span>
            <DropDown
              option={props.citiesList}
              selectedIndex={[props.selectedCities]}
              disabled={props.selectedProvince === -1}
              onSelect={(i: number) => {
                props.action(Target.ON_CHANGE_CITY, i);
              }}
            />
          </div>
        </div>
        <div className={styles.textBoxs}>
          <div className={styles.groupInput}>
            <span>از قیمت</span>
            <input
              value={props.from}
              onChange={(e) => props.action(Target.FROM_VALUE, e.target.value)}
            />
          </div>
          <div className={styles.groupInput}>
            <span>تا قیمت</span>
            <input
              value={props.to}
              onChange={(e) => props.action(Target.TO_VALUE, e.target.value)}
            />
          </div>
        </div>
        <div className={styles.textBoxs}>
          <div className={styles.groupInput}>
            <span>رنگ</span>
            <DropDown
              option={props.colorList}
              selectedIndex={[props.selectedColor]}
              onSelect={(i: number) => {
                props.action(Target.ON_CHANCE_COLOR, i);
              }}
            />
          </div>
          <div className={styles.groupInput}>
            <span>قیمت فروش</span>
            <input
              value={props.sellingPrice}
              onChange={(e) =>
                props.action(Target.SELLING_PRICE_VALUE, e.target.value)
              }
            />
          </div>
        </div>
        <div className={styles.textBoxs}>
          <div className={styles.groupInput}>
            <span className={styles.otherFeaturesToggle}>
              <input
                type={'checkbox'}
                checked={props.isPublished}
                onChange={() => {
                  props.action(Target.ON_TOGGLE_IS_PUBLISH);
                }}
              />
              انتشار
            </span>
          </div>
        </div>

        <div className={styles.record}>
          <button
            onClick={() => {
              props.action(Target.ON_SUBMIT);
            }}>
            ثبت
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
