import classNames from 'classnames';
import styles from './list-item.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCheck,
  faEdit,
  faTrash,
  faAngleUp,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

export enum Mode {
  Add,
  Edit,
  Stable,
}

interface Props {
  value: string;
  mode: Mode;
  selected?: boolean;
  sort?: {
    up: {
      disabled: boolean;
      go: () => void;
    };
    down: {
      disabled: boolean;
      go: () => void;
    };
  };
  action: (
    target: 'change' | 'add' | 'edit' | 'remove' | 'cancel' | 'select' | 'save',
    value?: any,
  ) => void;
}

export type ListItemProps = Props;

const ListItem: React.FC<ListItemProps> = (props) => {
  switch (props.mode) {
    case Mode.Add:
      return (
        <div className={styles.container}>
          <input
            type="text"
            value={props.value}
            onChange={({target}) => {
              props.action('change', target.value);
            }}
          />

          <div className={styles.buttons}>
            <button onClick={() => props.action('add')}>افزودن</button>
          </div>
        </div>
      );
    case Mode.Stable:
      return (
        <div
          className={classNames({
            [styles.container]: true,
            [styles.stable]: true,
            [styles.selected]: props.selected,
          })}>
          <div
            onClick={() => {
              props.action('select');
            }}>
            <input type="text" value={props.value} disabled={true} />
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.red}
              onClick={() => props.action('remove')}>
              <FontAwesomeIcon icon={faTrash} />
              حذف
            </button>
            <button
              className={styles.black}
              onClick={() => props.action('edit')}>
              <FontAwesomeIcon icon={faEdit} />
              ویرایش
            </button>
          </div>
          {props.sort && (
            <div className={styles.sorting}>
              <button
                className={styles.btn}
                onClick={props.sort?.up.go}
                disabled={props.sort?.up.disabled}>
                <FontAwesomeIcon className={styles.icon} icon={faAngleUp} />
              </button>
              <button
                className={styles.btn}
                onClick={props.sort?.down.go}
                disabled={props.sort?.down.disabled}>
                <FontAwesomeIcon className={styles.icon} icon={faAngleDown} />
              </button>
            </div>
          )}
        </div>
      );
    case Mode.Edit:
      return (
        <div className={styles.container}>
          <input
            type="text"
            value={props.value}
            onChange={({target}) => props.action('change', target.value)}
          />
          <div className={styles.buttons}>
            <button
              className={styles.red}
              onClick={() => props.action('cancel')}>
              <FontAwesomeIcon icon={faTimes} />
              لغو
            </button>
            <button
              className={styles.black}
              onClick={() => props.action('save')}>
              <FontAwesomeIcon icon={faCheck} />
              ذخیره
            </button>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default ListItem;
