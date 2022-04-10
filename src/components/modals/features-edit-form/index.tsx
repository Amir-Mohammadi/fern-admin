import React from 'react';
import ListItem, {Mode} from '../../list-item';
import styles from './feature-edit-form.module.scss';
import PopUP from '../../pop-up';
import DropDown from '../../dropdown';

export enum Target {
  ON_SORT_FEATURE = 'on-sort-feature',
  ON_CLOSE = 'on-close-category-feature-edit-form',
  ON_SELECT_MAIN_FEATURE = 'on-select-main-feature',
  ON_SELECT_FEATURE_OPTION = 'on-select-feature-option',
  REMOVE_FEATURE = 'remove-feature-in-edit',
  REMOVE_OPTION = 'remove-option',
  ADD_FEATURE_OPTION = 'add-feature-option',
  ON_CHANGE_FEATURE_OPTION_TITLE = 'on-change-feature-option-title',
  ON_SUBMIT = 'on-submit-updates',
  SELECTED_TYPE = 'selected-type_in_edit_form',
  EDIT_FEATURE_TITLE = 'edit-feature-title',
  EDIT_FEATURE = 'edit-feature',
  CANCEL_EDIT_FEATURE = 'CANCEL_EDIT_FEATURE',
}

interface props {
  featuresTree: {
    child: {
      description: string;
      id: number;
      parentId: number | null;
      title: string;
      type: number;
    }[];
    description: string;
    id: number;
    parentId: number | null;
    title: string;
    type: number;
  }[];
  featureType: {title: string}[];
  mainFeatures: number[];
  selectedFeature: number;
  editingFeatureId: number;
  oldFeatureTitle: string;
  featureOptionTitle: string;
  featureOptions: {
    id: number | null;
    parentId: number | string | null;
    value: string;
  }[];
  action: (target: Target, value?: any) => void;
}

export type FeatureEditFormProps = props;

const FeatureEditForm: React.FC<FeatureEditFormProps> = (props) => {
  return (
    <PopUP
      title={''}
      onClose={() => {
        props.action(Target.ON_CLOSE);
      }}
      options={[
        {
          type: 'submit',
          text: 'ویرایش',
          action: () => {
            props.action(Target.ON_SUBMIT);
          },
        },
        {
          type: 'cancel',
          text: 'انصراف',
          action: () => {
            props.action(Target.ON_CLOSE);
          },
        },
      ]}
      message={
        <div className={styles.container}>
          {props.featuresTree.map((feature, i) => {
            return (
              <div className={styles.row}>
                <div className={styles.feature}>
                  <ListItem
                    mode={
                      props.editingFeatureId == feature.id
                        ? Mode.Edit
                        : Mode.Stable
                    }
                    value={feature.title}
                    action={(target, value) => {
                      switch (target) {
                        case 'remove':
                          props.action(Target.REMOVE_FEATURE, feature.id);
                          break;

                        case 'edit':
                          props.action(Target.EDIT_FEATURE, {
                            id: feature.id,
                            oldTitle: feature.title,
                          });
                          break;
                        case 'change': {
                          const temp = [...props.featuresTree];
                          temp[i].title = value;
                          props.action(Target.EDIT_FEATURE_TITLE, temp);
                          break;
                        }
                        case 'cancel': {
                          const temp = [...props.featuresTree];
                          temp[i].title = props.oldFeatureTitle;
                          props.action(Target.CANCEL_EDIT_FEATURE, temp);
                          break;
                        }

                        default:
                          break;
                      }
                    }}
                    sort={{
                      up: {
                        disabled: i <= 0,
                        go: () => {
                          props.action(Target.ON_SORT_FEATURE, {
                            old: i,
                            new: i - 1,
                          });
                        },
                      },
                      down: {
                        disabled: 1 + i == props.featuresTree.length,
                        go: () => {
                          props.action(Target.ON_SORT_FEATURE, {
                            old: i,
                            new: 1 + i,
                          });
                        },
                      },
                    }}
                    key={feature.id}
                  />

                  {feature.child.map((subFeature, sI) => {
                    return (
                      <div className={styles.subFeature}>
                        <div className={styles.row}>
                          <input
                            type="checkbox"
                            checked={
                              props.mainFeatures.indexOf(subFeature.id) >= 0
                            }
                            onChange={() =>
                              props.action(
                                Target.ON_SELECT_MAIN_FEATURE,
                                subFeature.id,
                              )
                            }
                          />
                          <ListItem
                            mode={Mode.Stable}
                            value={subFeature.title}
                            selected={subFeature.id == props.selectedFeature}
                            action={(target) => {
                              switch (target) {
                                case 'remove':
                                  props.action(
                                    Target.REMOVE_FEATURE,
                                    subFeature.id,
                                  );
                                  break;
                                case 'select':
                                  if (
                                    subFeature.type == 3 ||
                                    subFeature.type == 4
                                  ) {
                                    props.action(
                                      Target.ON_SELECT_FEATURE_OPTION,
                                      subFeature.id,
                                    );
                                  }
                                  break;

                                default:
                                  break;
                              }
                            }}
                            key={subFeature.id}
                          />
                          <div className={styles.typeSelector}>
                            <DropDown
                              option={props.featureType}
                              selectedIndex={[subFeature.type]}
                              onSelect={(index: number) => {
                                const temp = [...props.featuresTree];
                                temp[i].child[sI].type = index;
                                props.action(Target.SELECTED_TYPE, temp);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {props.selectedFeature >= 0 ? (
            <div className={styles.row}>
              <div className={styles.valueList}>
                <span>گزینه ها</span>
                <ListItem
                  mode={Mode.Add}
                  value={props.featureOptionTitle}
                  action={(target, value) => {
                    switch (target) {
                      case 'add':
                        props.action(Target.ADD_FEATURE_OPTION);
                        break;
                      case 'change':
                        props.action(
                          Target.ON_CHANGE_FEATURE_OPTION_TITLE,
                          value,
                        );
                        break;
                      default:
                        break;
                    }
                  }}
                />

                {props.featureOptions.map((option, i) => {
                  if (option.parentId == props.selectedFeature) {
                    return (
                      <ListItem
                        key={i.toString() + option.parentId!}
                        mode={Mode.Stable}
                        value={option.value}
                        action={(target) => {
                          switch (target) {
                            case 'remove':
                              props.action(Target.REMOVE_OPTION, i);
                              break;

                            default:
                              break;
                          }
                        }}
                      />
                    );
                  }
                })}
              </div>
            </div>
          ) : null}
        </div>
      }
    />
  );
};

export default FeatureEditForm;
