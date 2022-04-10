import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

import Icons, {ActionType, IconTypes} from '../../icons';
import styles from './categories-list.module.scss';
import DropDown from '../../dropdown';
import PopUP, {PopUpProps} from '../../pop-up';
import LoadingDialog from '../../loading-dialog';

export enum Target {
  ON_SEARCH = 'categories-on-search',
  ON_PUBLISH = 'categories-on-publish',
  ON_EDIT = 'categories-on-edit',
  ON_ARCHIVE = 'categories-on-archive',
  ON_DELETE = 'categories-on-delete',
  FORM_LOAD = 'categories-list-form-load',
  SET_EDITING_ROW = 'categories-set-editing-row',
  ON_ROW_CHANGE = 'categories-on-row-change',
  SET_EDIT_VALUES = 'set-edit-values',
}

interface Props {
  popUp: {status: boolean; data: PopUpProps};
  loading: {
    status: boolean;
    message: string;
  };
  editingRow: {
    id?: number;
    name: string;
    parent_id: number | null;
    explanation: string | null;
  };
  categories: {title: string; id?: number}[];
  searchBar?: {
    visible: boolean;
    placeHolder: string;
    value: string;
  };
  table: {
    headers: string[];
    rows: {
      id?: number;
      name: string;
      parent_id: number | null;
      explanation: string | null;
    }[];
    actions: {type: ActionType; title?: string}[];
  };
  action: (target: Target, value?: any) => void;
}

export type CategoriesListDataSetProps = Props;

const CategoriesListDataSet: React.FC<CategoriesListDataSetProps> = (props) => {
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    props.action(Target.FORM_LOAD);
    return () => {};
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.bottom}>
        <table>
          <thead>
            <tr>
              <td className={styles.numberBorder}></td>
              {props.table.headers.map((titles, i) => (
                <th key={i}>{titles}</th>
              ))}
              <th>
                <div className={styles.search}>
                  <span>
                    <Icons
                      type={IconTypes.Search}
                      size={'9'}
                      color={'#707070'}
                    />
                  </span>
                  <input
                    placeholder={props.searchBar?.placeHolder}
                    type="text"
                    hidden={props.searchBar?.visible}
                    value={props.searchBar?.value}
                    onChange={({target}) =>
                      props.action(Target.ON_SEARCH, target.value)
                    }
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.table.rows.map((item, i) => [
              <tr className={styles.rowColor} key={i + 't1' + item.id}>
                <td className={styles.number}>
                  <span>{1 + i}</span>
                </td>
                <td>
                  <span>{item.name}</span>
                </td>
                <td>
                  <span>{item.explanation}</span>
                </td>
                <td>
                  <span>{item.parent_id}</span>
                </td>
                <td className={styles.operators}>
                  {editIndex == i ? (
                    <button
                      className={styles.back}
                      onClick={() => {
                        setEditIndex(-1);
                      }}
                      title={'بازگشت'}>
                      <span>
                        <Icons
                          type={IconTypes.Reject}
                          secondColor={'#db0060'}
                          size={'12'}
                        />
                      </span>
                    </button>
                  ) : (
                    props.table.actions.map((action, ai) => (
                      <button
                        onClick={() => {
                          switch (action.type) {
                            case ActionType.Archive:
                              props.action(Target.ON_ARCHIVE, i);
                              break;
                            case ActionType.Delete:
                              props.action(Target.ON_DELETE, item.id);
                              break;
                            case ActionType.Edit:
                              setEditIndex(i);
                              props.action(Target.SET_EDITING_ROW, i);
                              break;
                            case ActionType.Release:
                              props.action(Target.ON_PUBLISH, i);
                              break;
                            default:
                              break;
                          }
                        }}
                        title={action.title}
                        className={classNames({
                          [styles.archive]: action.type == ActionType.Archive,
                          [styles.release]: action.type == ActionType.Release,
                          [styles.delete]: action.type == ActionType.Delete,
                          [styles.edit]: action.type == ActionType.Edit,
                        })}>
                        <span>
                          <Icons
                            type={action.type}
                            color={'#ffffff'}
                            size={'12'}
                          />
                        </span>
                      </button>
                    ))
                  )}
                </td>
              </tr>,
              editIndex == i ? (
                <tr className={styles.info} key={i + 't2'}>
                  {renderEdit(props, editIndex)}
                </tr>
              ) : null,
            ])}
          </tbody>
        </table>
      </div>
      {props.loading.status && (
        <LoadingDialog message={props.loading.message} />
      )}
      {props.popUp.status && <PopUP {...props.popUp.data} />}
    </div>
  );
};

export default CategoriesListDataSet;

function renderEdit(props: CategoriesListDataSetProps, i: number) {
  const temp = {...props.editingRow};
  return (
    <td colSpan={8}>
      <div className={styles.editBX}>
        <div className={styles.editHD}>
          <span>{'ویرایش'}</span>
          <span
            className={styles.link}
            onClick={() => {
              global.__stores__.cmpNavigate.goto(2);
              global.__stores__.addNewCategory.handleActions(
                Target.SET_EDIT_VALUES,
                temp.id,
              );
            }}>
            ویرایش ویژگی ها
          </span>
        </div>
        <div className={styles.editBD}>
          <div className={styles.setTable}>
            <span>{props.table.headers[0]}</span>
            <input
              type="text"
              onChange={({target}) => {
                temp.name = target.value;
                props.action(Target.ON_ROW_CHANGE, temp);
              }}
              value={props.editingRow.name}
            />
          </div>
          <div className={styles.setTable}>
            <span>{props.table.headers[1]}</span>
            <input
              type="text"
              onChange={({target}) => {
                temp.explanation = target.value;
                props.action(Target.ON_ROW_CHANGE, temp);
              }}
              value={'' + props.editingRow.explanation}
            />
          </div>
          <div className={styles.setTable}>
            <span>{props.table.headers[2]}</span>
            <DropDown
              selectedIndex={[
                props.categories.findIndex(
                  (category) => category.id == temp.parent_id,
                ),
              ]}
              option={props.categories}
              onSelect={(i) => {
                temp.parent_id = props.categories[i].id;
                props.action(Target.ON_ROW_CHANGE, temp);
              }}
            />
          </div>
          <div className={styles.setItem}>
            <button onClick={() => props.action(Target.ON_EDIT, i)}>
              ثبت تغییرات
            </button>
          </div>
        </div>
      </div>
    </td>
  );
}
