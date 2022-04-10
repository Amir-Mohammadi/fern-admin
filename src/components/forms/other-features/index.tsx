import React from 'react';
import ListItem, {Mode} from '../../list-item';
import styles from './other-feature.module.scss';

export enum Target {
  ON_LABEL_CHANGE = 'on-label-change',
  ON_VALUE_CHANGE = 'on-value-change',
  ON_ADD_VALUE = 'on-add-value',
  ON_REMOVE_VALUE = 'on-remove-value',
}

interface props {
  labelText: string;
  valueText: string;
  values: {id: number; title: string; row_version: string | null}[];
  featureTitle: string;
  action: (target: Target, value?: any) => void;
}

export type OtherFeaturesProps = props;

const OtherFeatures: React.FC<OtherFeaturesProps> = (props) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.header}>{`سایر ویژگی های ${props.featureTitle}`}</div>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <span>فیلد</span>
          <input
            type="text"
            value={props.labelText}
            onChange={({target}) => {
              const temp = {...props};
              temp.labelText = target.value;

              props.action(Target.ON_LABEL_CHANGE, {
                features: temp,
              });
            }}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={props.valueText}
            onChange={({target}) => {
              const temp = {...props};
              temp.valueText = target.value;
              props.action(Target.ON_VALUE_CHANGE, {
                features: temp,
              });
            }}
            onKeyPress={({key}) => {
              if (key == 'Enter') {
                const temp = {...props};
                temp.values.push({
                  id: -1,
                  title: temp.valueText,
                  row_version: null,
                });
                temp.valueText = '';
                props.action(Target.ON_ADD_VALUE, {
                  features: temp,
                });
              }
            }}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={styles.success}
            onClick={() => {
              const temp = {...props};
              temp.values.push({
                id: -1,
                title: temp.valueText,
                row_version: null,
              });
              temp.valueText = '';
              props.action(Target.ON_ADD_VALUE, {
                features: temp,
              });
            }}>
            ایجاد مشخصه
          </button>
        </div>
      </div>
      {props.values.map((item, i) => (
        <div className={styles.row} key={i.toString() + item}>
          <ListItem
            mode={Mode.Stable}
            value={item.title}
            action={(target) => {
              switch (target) {
                case 'remove':
                  const temp = {...props};
                  temp.values.splice(i, 1);
                  props.action(Target.ON_REMOVE_VALUE, {
                    features: temp,
                    deletedId: item.id,
                  });
                  break;

                default:
                  break;
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default OtherFeatures;
