import React, {useEffect} from 'react';
import styles from './add-new-category.module.scss';

import AddButtonBG from '../../add-button-bg';
import DropDown from '../../dropdown';
import ListItem, {Mode} from '../../list-item';
import PopUP, {PopUpProps} from '../../pop-up';
import LoadingDialog from '../../loading-dialog';

export enum Target {
  SELECTED_CATEGORY = 'selected-category',
  CATEGORY_TITLE = 'category-title',
  CATEGORY_DESCRIPTION = 'category-description',
  FEATURE_TITLE = 'feature-title',
  EDIT_FEATURE_TITLE = 'edit-feature-title',
  SELECTED_TYPE = 'selected-type',
  SELECTED_PARENT = 'selected-parent',
  ADD_FEATURE = 'add-feature',
  REMOVE_FEATURE = 'remove-feature',
  REMOVE_OPTION = 'remove-option',
  FORM_LOAD = 'category-form-load',
  ADD_CATEGORY = 'add-category',
  ADD_FEATURE_OPTION = 'add-feature-option',
  ON_CHANGE_FEATURE_OPTION_TITLE = 'on-change-feature-option-title',
  ON_SELECT_FEATURE_OPTION = 'on-select-feature-option',
  ON_SORT_FEATURE = 'on-sort-feature',
  ON_TOGGLE_IS_MAIN = 'on-toggle-is-main',
  ON_TOGGLE_SHOW_IN_FILTER = 'on-toggle-show-in-filter',
  EDIT_FEATURE = 'edit-feature',
  CANCEL_EDIT_FEATURE = 'CANCEL_EDIT_FEATURE',
  SAVE_EDIT_FEATURE = 'save-edit-feature',
}

interface props {
  categoryId: number;
  isMain: boolean;
  showInFilter: boolean;
  categoryTitle: {value: string; errorMessage: string | null};
  categories: Array<{title: string}>;
  selectedCategory: number;
  categoryDescription: string;
  featureTitle: string;
  selectedFeature: number | string;
  featureOptions: Array<{
    id: number | null;
    parentId: number | string | null;
    value: string;
  }>;
  featureOptionTitle: string;
  selectedType: number;
  selectedParent: number;
  editingFeatureId: number;
  oldFeatureTitle: string;
  featureType: Array<{title: string}>;
  featureDescription: string;
  mainFeatures: Array<number>;
  filtrableFeatures: Array<number>;
  popUp: {status: boolean; data: PopUpProps};
  loading: {
    status: boolean;
    message: string;
  };
  featuresParentList: Array<{
    title: string;
    id: number;
  }>;
  featuresTree: Array<{
    child: Array<{
      description?: string;
      id: number;
      parentId: number;
      title: string;
      type: number;
      isMain: boolean;
      showInFilter: boolean;
      hasMultiple: boolean;
    }>;
    id: number;
    title: string;
    type: number;
  }>;
  action: (target: Target, value?: any) => void;
}

export type AddNewCategoryProps = props;

const AddNewCategory: React.FC<AddNewCategoryProps> = (props) => {
  useEffect(() => {
    props.action(Target.FORM_LOAD);
    return () => {};
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.addCategoryButtonBX}>
        <AddButtonBG title="ایجاد دسته جدید" onClick={() => {}} />
      </div>

      <div className={styles.box}>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <span>عنوان دسته</span>
            <input
              type="text"
              value={props.categoryTitle.value}
              onChange={({target}) =>
                props.action(Target.CATEGORY_TITLE, target.value)
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <span>دسته والد</span>

            <DropDown
              option={props.categories}
              selectedIndex={[props.selectedCategory]}
              customValue={'دسته جدید'}
              onSelect={(i: number) => {
                props.action(Target.SELECTED_CATEGORY, i);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <span>توضیحات</span>

            <div className={styles.textBox}></div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.buttonGroup}>
            <button className={styles.danger} onClick={() => {}}>
              لغو
            </button>
            <button
              className={styles.success}
              onClick={() => props.action(Target.ADD_CATEGORY)}>
              ثبت
            </button>
          </div>
        </div>
      </div>

      <div className={styles.addCategoryButtonBX}>
        <AddButtonBG title="ایجاد مشخصه محصول جدید" onClick={() => {}} />
      </div>

      {props.categoryId > -1 && (
        <div className={styles.box}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <span>عنوان</span>
              <input
                type="text"
                value={props.featureTitle}
                onChange={({target}) =>
                  props.action(Target.FEATURE_TITLE, target.value)
                }
              />
            </div>

            <div className={styles.inputGroup}>
              <span>نوع</span>
              <DropDown
                option={props.featureType}
                selectedIndex={[props.selectedType]}
                disabled={!props.featuresParentList.length}
                onSelect={(i: number) => {
                  props.action(Target.SELECTED_TYPE, i);
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <span>بخش</span>
              <DropDown
                option={props.featuresParentList}
                disabled={
                  !(props.featuresParentList.length && props.selectedType > 0)
                }
                selectedIndex={[props.selectedParent]}
                onSelect={(i: number) => {
                  props.action(Target.SELECTED_PARENT, i);
                }}
              />
            </div>
            {props.selectedType > 0 && (
              <div className={styles.subFeatureOptions}>
                <span>
                  <input
                    type="checkbox"
                    checked={props.isMain}
                    onChange={() => {
                      props.action(Target.ON_TOGGLE_IS_MAIN);
                    }}
                  />
                  ویژگی اصلی
                </span>
                <span>
                  <input
                    type="checkbox"
                    checked={props.showInFilter}
                    onChange={() => {
                      props.action(Target.ON_TOGGLE_SHOW_IN_FILTER);
                    }}
                  />
                  فیلتر بر اساس این فیلد
                </span>
              </div>
            )}
          </div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <div className={styles.addBX}>
                <button
                  onClick={() => {
                    props.action(Target.ADD_FEATURE);
                  }}>
                  افزودن
                </button>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <span>توضیحات</span>

              <div className={styles.textBox}></div>
            </div>
          </div>
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
                        case 'save':
                          props.action(Target.SAVE_EDIT_FEATURE);
                          break;
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
                {props.featureOptions.map((options, i) => {
                  if (options.parentId == props.selectedFeature) {
                    return (
                      <ListItem
                        key={i.toString() + options.parentId!}
                        mode={Mode.Stable}
                        value={options.value}
                        action={(target, value) => {
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

          <div className={styles.row}>
            <div className={styles.buttonGroup}>
              <button className={styles.danger} onClick={() => {}}>
                لغو
              </button>
              <button
                className={styles.success}
                onClick={() => props.action(Target.ADD_CATEGORY)}>
                ثبت
              </button>
            </div>
          </div>
        </div>
      )}

      {props.loading.status && (
        <LoadingDialog message={props.loading.message} />
      )}
      {props.popUp.status && <PopUP {...props.popUp.data} />}
    </div>
  );
};

export default AddNewCategory;
