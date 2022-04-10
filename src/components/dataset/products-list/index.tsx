import Icons, {ActionType, IconTypes} from '../../icons';
import styles from './products-list.module.scss';
import classNames from 'classnames';
import {useEffect, useState} from 'react';
import DropDown from '../../dropdown';
import PopUP, {PopUpProps} from '../../pop-up';
import LoadingDialog from '../../loading-dialog';

export enum Target {
  SEARCH_INPUT = 'search-input',
  ON_SEARCH = 'on-search',
  PRODUCT_LIST_HEADERS = 'product-list-headers',
  PRODUCT_LIST_ROWS = 'product-list-rows',
  ON_PUBLISH = 'on-publish',
  ON_EDIT = 'on-edit',
  ON_MORE_EDIT = 'on-more-edit',
  ON_ARCHIVE = 'on-archive',
  ON_DELETE = 'on-delete',
  FORM_LOAD = 'product-list-form-load',
  SET_EDITING_ROW = 'set-editing-row',
  SET_EDIT_VALUES = 'set-edit-values',
  ON_ROW_CHANGE = 'on-row-change',
}

interface Props {
  popUp: {status: boolean; data: PopUpProps};
  loading: {
    status: boolean;
    message: string;
  };
  editingRow: {
    id?: number;
    product?: {name?: string; img?: string};
    productIdInStock?: string;
    price?: number;
    inventory?: number;
    type?: string;
    category_id?: number;
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
      id: number;
      product: {name: string; img?: string};
      productIdInStock: string;
      price: number;
      inventory: number;
      type: string;
      category_id: number;
    }[];
    actions: {type: ActionType; title?: string}[];
  };
  action: (target: Target, value?: any) => void;
}

export type ProductsListDataSetProps = Props;

const ProductionListDataSet: React.FC<ProductsListDataSetProps> = (props) => {
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
                    placeholder={props.searchBar!.placeHolder}
                    type="text"
                    hidden={props.searchBar!.visible}
                    value={props.searchBar!.value}
                    onChange={({target}) =>
                      props.action(Target.SEARCH_INPUT, target.value)
                    }
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.table.rows.map((item, i) => [
              <tr className={styles.rowColor} key={i + 't1'}>
                <td className={styles.number}>
                  <span>{1 + i}</span>
                </td>
                <td>
                  <div>
                    <div className={styles.productImg}>
                      {item.product.img ? (
                        <img src={item.product.img} width="58px" />
                      ) : (
                        <div className={styles.productLogo}>
                          <Icons
                            type={IconTypes.Logo}
                            size={'35'}
                            color={'#707070'}
                          />
                        </div>
                      )}
                    </div>
                    <div className={styles.productName}>
                      <span>{item.product.name}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span>{item.productIdInStock}</span>
                </td>
                <td>
                  <span>{item.price}</span>
                </td>
                <td>
                  <span>{item.inventory}</span>
                </td>
                <td>
                  <span>{item.type}</span>
                </td>
                <td>
                  <span>
                    {
                      props.categories.find(
                        (category) => category.id == item.category_id,
                      )?.title
                    }
                  </span>
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
                              props.action(Target.ON_DELETE, i);
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
                        })}
                        key={ai + action.type}>
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
      {props.loading.status && (
        <LoadingDialog message={props.loading.message} />
      )}
      {props.popUp.status && <PopUP {...props.popUp.data} />}
    </div>
  );
};

export default ProductionListDataSet;

function renderEdit(props: ProductsListDataSetProps, i: number) {
  const temp = {...props.editingRow};
  return (
    <td colSpan={8}>
      <div className={styles.editContainer}>
        <div className={styles.editHeader}>
          <span>{'ویرایش'}</span>
          <span
            className={styles.link}
            onClick={() => {
              global.__stores__.cmpNavigate.goto(0);
              global.__stores__.addNewProduct.handleActions(
                Target.SET_EDIT_VALUES,
                temp.id,
              );
            }}>
            ویرایش ویژگی ها
          </span>
        </div>
        <div className={styles.editBottom}>
          <div className={styles.setTable}>
            <span>{props.table.headers[0]}</span>
            <input
              type="text"
              onChange={({target}) => {
                temp.product!.name = target.value;
                props.action(Target.ON_ROW_CHANGE, temp);
              }}
              value={props.editingRow.product?.name}
            />
          </div>
          <div className={styles.setTable}>
            <span>{props.table.headers[1]}</span>
            <input
              type="text"
              onChange={({target}) => {
                temp.productIdInStock = target.value;
                props.action(Target.ON_ROW_CHANGE, temp);
              }}
              value={props.editingRow.productIdInStock}
            />
          </div>
          <div className={styles.setTable}>
            <span>{props.table.headers[2]}</span>
            <input
              type="text"
              onChange={({target}) => {
                temp.price = +target.value;
                props.action(Target.ON_ROW_CHANGE, temp);
              }}
              value={props.editingRow.price}
            />
          </div>
          <div className={styles.setTable}>
            <span>{props.table.headers[3]}</span>
            <input
              type="text"
              onChange={({target}) => {
                temp.inventory = +target.value;
                props.action(Target.ON_ROW_CHANGE, temp);
              }}
              value={props.editingRow.inventory}
            />
          </div>
          <div className={styles.setTable}>
            <span>{props.table.headers[4]}</span>
            <input
              type="text"
              onChange={({target}) => {
                temp.type = target.value;
                props.action(Target.ON_ROW_CHANGE, temp);
              }}
              value={props.editingRow.type}
            />
          </div>
          <div className={styles.setTable}>
            <span>{props.table.headers[5]}</span>
            <DropDown
              selectedIndex={[
                props.categories.findIndex(
                  (category) => category.id == temp.category_id,
                ),
              ]}
              option={props.categories}
              onSelect={(i) => {
                temp.category_id = props.categories[i].id;
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
