import React, {useState} from 'react';

import styles from './add-new-user.module.scss';
import DropDown from '../dropdown';

export enum Type {
  ON_CHANGE_USERNAME = 'username',
  ON_CHANGE_USERTYPE = 'usertype',
  CHANGE_EMAIL = 'email',
  SUBMIT = 'submit',
}
interface Props {
  phone: string;
  userType: {title: string; index: number}[];
  selectedUserType: number;
  email: string;
  action: (type: Type, value?: any) => void;
}

export type AddNewUserFormProps = Props;

const AddNewUserForm: React.FC<AddNewUserFormProps> = (props) => {
  const renderDropdownMenus = () => {
    const [active, setActive] = useState(false);

    return (
      <div className={styles.optionBD}>
        <span className={styles.dropdownTitle}>گروه کاربری</span>

        <DropDown
          option={props.userType}
          selectedIndex={[props.selectedUserType]}
          onSelect={(i: number) => {
            props.action(Type.ON_CHANGE_USERTYPE, i);
            setActive(true);
          }}
        />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>ثبت کاربر جدید</div>
      <div className={styles.optionsBX}>
        <div className={styles.rightSide}>
          <div className={styles.usernameText}>
            <span>موبایل</span>
            <input
              type="text"
              placeholder={'091'}
              value={props.phone}
              onChange={({target}) =>
                props.action(Type.ON_CHANGE_USERNAME, target.value)
              }
            />
          </div>
          {renderDropdownMenus()}
          <div className={styles.emailText}>
            <span>ایمیل</span>
            <input
              placeholder={'info@googlemail.com'}
              value={props.email}
              onChange={({target}) =>
                props.action(Type.CHANGE_EMAIL, target.value)
              }
            />
          </div>
        </div>
        <div className={styles.buttonBX}>
          <button
            onClick={() => {
              props.action(Type.SUBMIT);
            }}>
            ثبت
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewUserForm;
