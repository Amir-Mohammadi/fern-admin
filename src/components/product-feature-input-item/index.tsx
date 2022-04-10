import React, {FC, useState} from 'react';
import DropDown from '../dropdown';

import styles from './product-feature-input-item.module.scss';

import {CATEGORY_TYPE} from '../../utils/types/enums';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import PopUP from '../pop-up';

export enum Target {
  ON_CHANGE = 'on-change-feature-value',
  ADD_NEW_VALUE = 'add-new-value-for-feature',
}

interface Props {
  id: number;
  product_category_property_id: number;
  title: string;
  type: CATEGORY_TYPE;
  options?: {title: string; id: number}[];
  values?: number[];
  textValue?: string;
  has_multiple: boolean;
  action?: (target: Target, v: any) => void;
  row_version: string;
}

export type ProductFeatureInputItemProps = Props;

const ProductFeatureInputItem: FC<ProductFeatureInputItemProps> = (props) => {
  const [popup, setPopup] = useState(false);
  const [newValue, setNewValue] = useState('');

  return (
    <div className={styles.container}>
      {console.log(props)}
      <div className={styles.key}>{props.title}</div>
      <div className={styles.value}>
        {renderInput(props)}
        {props.type == CATEGORY_TYPE.list && (
          <button onClick={() => setPopup(true)} title={'افزودن مقدار جدید'}>
            <FontAwesomeIcon icon={faPlus} color={'#fafafa'} />
          </button>
        )}
      </div>
      {popup && (
        <PopUP
          title=""
          message={
            <AddNewValueForm
              values={props.options}
              value={newValue}
              onSetValue={(value) => setNewValue(value)}
            />
          }
          options={[
            {
              text: 'ثبت',
              type: 'submit',
              action: () => {
                props.action(Target.ADD_NEW_VALUE, {
                  value: newValue,
                  parentId: props.id,
                });
                setNewValue('');
              },
            },
          ]}
          onClose={() => {
            setPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductFeatureInputItem;

const renderInput = (props: ProductFeatureInputItemProps) => {
  const [search, setSearch] = useState('');
  console.log(props.type);
  switch (props.type) {
    case CATEGORY_TYPE.list:
      return (
        <DropDown
          option={props.options!}
          selectedIndex={props.values}
          checkMode={props.has_multiple}
          onSelect={(i: number) => {
            props.action!(Target.ON_CHANGE, i);
          }}
          search={{
            input: search,
            handleChange: (value) => {
              setSearch(value);
            },
          }}
        />
      );

    case CATEGORY_TYPE.text:
      console.log('oidfhgiodfjgoid');

      return (
        <input
          type={'text'}
          placeholder={'مقدار'}
          value={props.textValue}
          onChange={({target}) => props.action!(Target.ON_CHANGE, target.value)}
        />
      );

    case CATEGORY_TYPE.number:
      console.log('oidfhgiodfjgoid');

      return (
        <input
          type={'text'}
          placeholder={'مقدار'}
          value={props.textValue}
          onChange={({target}) => props.action!(Target.ON_CHANGE, target.value)}
        />
      );

    default:
      return;
  }
};

const AddNewValueForm: FC<{
  values: Array<{title: string; id: number}>;
  value: string;
  onSetValue: (value: string) => void;
}> = (props) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <input
          type={'text'}
          placeholder={'مقدار'}
          value={props.value}
          onChange={({target}) => {
            props.onSetValue(target.value);
          }}
        />
      </div>
      <div className={styles.values}>
        {props.values.map((value) => (
          <span key={value.id}>{value.title}</span>
        ))}
      </div>
    </div>
  );
};
