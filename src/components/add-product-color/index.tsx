import React, {useState} from 'react';
import DropDown from '../dropdown';
import TagItem from '../tag-item';
import styles from './add-product-color.module.scss';

export enum Target {
  NEW_COLOR_NAME = 'new-color-name',
  NEW_COLOR_CODE = 'new-color-code',
  ADD_NEW_COLOR = 'add-new-color',
  ADD_COLOR_TO_LIST = 'add-color-to-list',
  SELECTED_COLOR = 'selected-color',
  REMOVE_PRODUCT_Color = 'remove-product-color',
}
interface Props {
  newColorName: string;
  newColorCode: number;
  colors: {title: string}[];
  productListColor: {ColorName: string; colorId: number}[];
  selectedColor: Array<number>;
  action?: (type: Target, value?: any) => void;
}

export type AddProductColorFormProps = Props;

const AddProductColorForm: React.FC<AddProductColorFormProps> = (props) => {
  const [search, setSearch] = useState('');
  const [showAddColor, setShowAddColor] = useState(false);

  return (
    <div className={styles.colorForm}>
      {!showAddColor ? (
        <>
          
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <span>رنگ محصول </span>
            <DropDown
              option={props.colors}
              selectedIndex={props.selectedColor}
              search={{
                input: search,
                handleChange: (value) => {
                  setSearch(value);
                },
              }}
              checkMode={true}
              onSelect={(i: number) => {
                props.action(Target.SELECTED_COLOR, i);
              }}
            />
          </div>

            <div className={styles.buttonGroup}>
              <button
                className={styles.success}
                onClick={() => props.action(Target.ADD_COLOR_TO_LIST)}>
                افزودن
              </button>
            </div>
            <div className={styles.buttonGroup}>
              <button
                className={styles.success}
                onClick={() => setShowAddColor(true)}>
                افزودن رنگ جدید
              </button>
            </div>
          </div>
          <div className={styles.rowColor}>
            {props.productListColor.map((item, i) => (
              <TagItem
                key={i + 'tAgItEm'}
                text={item.ColorName}
                onRemove={() => props.action(Target.REMOVE_PRODUCT_Color, i)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <span>رنگ</span>
            <input
              type="text"
              value={props.newColorName}
              onChange={({target}) =>
                props.action(Target.NEW_COLOR_NAME, target.value)
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <span>کد رنگ</span>
            <input
              type="text"
              value={props.newColorCode}
              onChange={({target}) =>
                props.action(Target.NEW_COLOR_CODE, target.value)
              }
            />
          </div>
          <div className={styles.buttonGroup}>
            <button
              className={styles.success}
              onClick={() => {
                props.action(Target.ADD_NEW_COLOR);
                setShowAddColor(false);
              }}>
              افزودن
            </button>
          </div>
          <div className={styles.buttonGroup}>
            <button
              className={styles.cancel}
              onClick={() => setShowAddColor(false)}>
              لغو
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductColorForm;
