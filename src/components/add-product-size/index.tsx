import React, {useState} from 'react';
import styles from './add-product-size.module.scss';

export enum Target {
  PRODUCT_WEIGHT = 'product-weight',
  PRODUCT_HEIGHT = 'product-heigth',
  PRODUCT_WIDTH = 'product-width',
  PRODUCT_LENGTH = 'product-length',
}
interface Props {
  productWeight: number;
  productLength: number;
  productWidth: number;
  productHeight: number;
  action?: (type: Target, value?: any) => void;
}

export type AddProductSizeFormProps = Props;

const AddProductSizeForm: React.FC<AddProductSizeFormProps> = (props) => {
  return (
    <div className={styles.tagForm}>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <span>وزن</span>
          <input
            type="text"
            value={props.productWeight}
            onChange={({target}) =>
              props.action(Target.PRODUCT_WEIGHT, target.value)
            }
          />
        </div>

        <div className={styles.inputGroup}>
          <span>طول</span>
          <input
            type="text"
            value={props.productLength}
            onChange={({target}) =>
              props.action(Target.PRODUCT_LENGTH, target.value)
            }
          />
        </div>

        <div className={styles.inputGroup}>
          <span>عرض</span>
          <input
            type="text"
            value={props.productWidth}
            onChange={({target}) =>
              props.action(Target.PRODUCT_WIDTH, target.value)
            }
          />
        </div>

        <div className={styles.inputGroup}>
          <span>ارتفاع</span>
          <input
            type="text"
            value={props.productHeight}
            onChange={({target}) =>
              props.action(Target.PRODUCT_HEIGHT, target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductSizeForm;
