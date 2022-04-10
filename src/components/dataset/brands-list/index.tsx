import {useEffect, useState} from 'react';
import classNames from 'classnames';

import Icons, {ActionType, IconTypes} from '../../icons';
import styles from './brands-list.module.scss';

export enum Target {
  ON_SEARCH = 'brands-on-search',
  ON_PUBLISH = 'brands-on-publish',
  ON_EDIT = 'brands-on-edit',
  ON_ARCHIVE = 'brands-on-archive',
  ON_DELETE = 'brands-on-delete',
  ON_ROW_CHANGE = 'brands-on-row-change',
  FORM_LOAD = 'brands-list-load',
  SET_EDITING_ROW = 'brands-set-editing-row',
}

export type brandRow = {
  id: 0;
  name: string;
  urlTitle: string;
  imageTitle: string;
  imageAlt: string;
  imageUrl: string;
  rowVersion: string | null;
  browserTitle: string;
  description: string;
  metaDescription: string;
};

interface Props {
  brandEditingRow: {
    id: number;
    name: string;
    logo: string;
    englishName: string;
  };

  searchBar?: {
    visible: boolean;
    placeHolder: string;
    value: string;
  };
  table: {
    brandsListHeader: string[];
    brandsList: Array<brandRow>;
    actions: {type: ActionType; title?: string}[];
  };
  action?: (target: Target, value?: any) => void;
}

export type BrandsListDataSetProps = Props;

const BrandsListDataSet: React.FC<BrandsListDataSetProps> = (props) => {
  useEffect(() => {
    props.action!(Target.FORM_LOAD);
    return () => {};
  }, []);

  const [editIndex, setEditIndex] = useState(-1);

  return (
    <div className={styles.container}>
      <div className={styles.bottom}>
        <table>
          <thead>
            <tr>
              <td className={styles.numberBorder}></td>
              {props.table.brandsListHeader.map((titles, i) => (
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
                      props.action!(Target.ON_SEARCH, target.value)
                    }
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.table.brandsList.map((item, i) => [
              <tr className={styles.rowColor} key={i + 't1' + item.id}>
                <td className={styles.number}>
                  <span>{1 + i}</span>
                </td>
                <td className={styles.imageColumn}>
                  <img
                    src={item.imageUrl}
                    title={item.imageTitle}
                    alt={item.imageAlt}
                  />
                </td>
                <td>
                  <span>{item.name}</span>
                </td>
                <td>
                  <span>{item.browserTitle}</span>
                </td>
                <td>
                  <span>{item.urlTitle}</span>
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
                              props.action!(Target.ON_ARCHIVE, i);
                              break;
                            case ActionType.Delete:
                              props.action!(Target.ON_DELETE, i);
                              break;
                            case ActionType.Edit:
                              setEditIndex(i);
                              props.action!(Target.SET_EDITING_ROW, i);
                              break;
                            case ActionType.Release:
                              props.action!(Target.ON_PUBLISH, i);
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
        {}
      </div>
    </div>
  );
};

export default BrandsListDataSet;

function renderEdit(props: BrandsListDataSetProps, i: number) {
  const temp = {...props.brandEditingRow};
  return (
    <td colSpan={8}>
      <div className={styles.editContainer}>
        <div className={styles.editHeader}>
          <span>{'ویرایش'}</span>
        </div>
        <div className={styles.editBottom}>
          <div className={styles.setTable}>
            <span>{props.table.brandsListHeader[1]}</span>
            <input
              type="text"
              onChange={({target}) => {
                temp.name = target.value;
                props.action!(Target.ON_ROW_CHANGE, temp);
              }}
              value={'' + props.brandEditingRow.name}
            />
          </div>
          <div className={styles.setTable}>
            <span>{props.table.brandsListHeader[2]}</span>
            <input
              type="text"
              onChange={({target}) => {
                temp.englishName = target.value;
                props.action!(Target.ON_ROW_CHANGE, temp);
              }}
              value={'' + props.brandEditingRow.englishName}
            />
          </div>

          <div className={styles.setTable}>
            <span>{props.table.brandsListHeader[0]}</span>
            <div>
              <input type="file" id="file" />

              <label htmlFor="file">انتخاب</label>
            </div>
          </div>
          <div className={styles.setItem}>
            <button onClick={() => props.action!(Target.ON_EDIT, i)}>
              ثبت تغییرات
            </button>
          </div>
        </div>
      </div>
    </td>
  );
}
