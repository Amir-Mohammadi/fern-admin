import Icons, {ActionType, IconTypes} from '../icons';
import styles from './dataset.module.scss';
import classNames from 'classnames';
import {useState} from 'react';

export enum Target {
  SET_CHANGE = 'setChange',
  CHANGE_EDITOR = 'change-editor',
  EDIT_VALUE = 'edit-value',
  ON_CHANGE = 'ON_CHANGE',
}
export type Rows = {
  text: string;
  editable?: boolean;
};
export type SearchBar = {
  visible: boolean;
  placeHolder: string;
  value: string;
};
export type Editor = {
  text: string;
  editable?: boolean;
};

interface Props {
  header: {
    title: string;
    searchBar: SearchBar;
  };
  table: {
    header: string[];
    rows: Rows[][];

    actions: {type: ActionType; title?: string}[];
  };
  editor: Editor[];
  action: (target: Target, value?: any) => void;
}

export type DataSetProps = Props;

const DataSet: React.FC<DataSetProps> = (props) => {
  const [editIndex, setEditIndex] = useState(-1);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{props.header.title}</span>

        <div className={styles.search}>
          <span>
            <Icons type={IconTypes.Search} size={'9'} color={'#707070'} />
          </span>
          <input
            placeholder={props.header.searchBar.placeHolder}
            type="text"
            hidden={props.header.searchBar.visible}
            value={props.header.searchBar.value}
            onChange={(e) => props.action(Target.ON_CHANGE)}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <table>
          <thead>
            <tr>
              <td className={styles.numberBorder}></td>
              {props.table.header.map((titles, i) => (
                <th>{titles}</th>
              ))}
              <td style={{width: '539px'}}></td>
            </tr>
          </thead>
          <tbody>
            {props.table.rows.map((value, i) => [
              <tr className={styles.rowColor} key={i + 't1'}>
                <td className={styles.number}>
                  <span>{1 + i}</span>
                </td>
                {value.map((item, i) => (
                  <td>
                    <span>{item.text}</span>
                  </td>
                ))}
                <td
                  style={{
                    paddingLeft: '22px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'row-reverse',
                  }}>
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
                          if (action.type == ActionType.Edit) {
                            setEditIndex(i);
                            props.action(Target.EDIT_VALUE, i);
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
                  {renderEdit(props)}
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

export default DataSet;

function renderEdit(props: DataSetProps) {
  return (
    <td colSpan={6}>
      <div className={styles.editContainer}>
        <div className={styles.editHeader}>
          <span>{'ویرایش ' + props.editor[0].text}</span>
        </div>
        <div className={styles.editBottom}>
          {props.editor.map((input, i) =>
            input.editable ? (
              <div className={styles.setTable}>
                <span>{props.table.header[i]}</span>
                <input
                  type="text"
                  value={input.text}
                  onChange={({target}) => {
                    input.text = target.value;
                    props.action(Target.CHANGE_EDITOR);
                  }}
                />
              </div>
            ) : null,
          )}
          <div className={styles.setItem}>
            <button onClick={() => props.action(Target.SET_CHANGE)}>
              <span>ثبت تغییرات</span>
            </button>
          </div>
        </div>
      </div>
    </td>
  );
}


