import {useState} from 'react';
import DropDown from '../dropdown';
import styles from './seller-address-form.module.scss';

export enum Target {
  SELECTED_STATE = 'STATES',
  SELECTED_CITY = 'CITIES',
  POSTAL_CODE = 'POSTALCODE',
  PHONE = 'PHONE',
  STREET = 'STREET',
  TEL = 'TEL',
  ALLEY = 'ALLEY',
  EMAIL = 'EMAIL',
  PLAQUE = 'PLAQUE',
  WEBSITE = 'WEBSITE',
  NEXT_PAGE = 'ADDRESS-NEXT-PAGE',
}

interface Props {
  states: {title: string}[];
  cities: {title: string}[];
  selectedState: number;
  selectedCity: number;
  postalCode: string;
  mobile: string;
  street: string;
  tel: string;
  alley: string;
  email: string;
  plaque: string;
  website: string;

  action: (target: Target, value?: any) => void;
}

export type SellerAddressFormProps = Props;

const SellerAddressForm: React.FC<SellerAddressFormProps> = (props) => {
  const [state, setState] = useState<'state' | 'city' | 'none'>('none');
  return (
    <div className={styles.container}>
      <div className={styles.rightSide}>
        <div className={styles.states}>
          <span>استان</span>

          <div
            className={styles.dropDown}
            onClick={() => setState('state')}
            tabIndex={0}
            onBlur={() => setState('none')}>
            {props.states[props.selectedState]}
            {state == 'state' ? (
              <div className={styles.dropDownWindow}>
                <DropDown
                  onSelect={(i) => {
                    props.action(Target.SELECTED_STATE, i);
                    setState('none');
                  }}
                  option={props.states}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.cities}>
          <span>شهر</span>
          <div
            className={styles.dropDownCity}
            onClick={() => setState('city')}
            tabIndex={0}
            onBlur={() => setState('none')}>
            {state == 'city' ? (
              <div className={styles.dropDownWindowCity}>
                <DropDown
                  onSelect={(i) => {
                    props.action(Target.SELECTED_CITY, i);
                    setState('none');
                  }}
                  option={props.cities}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.street}>
          <span>خیابان</span>
          <input
            type="text"
            value={props.street}
            onChange={({target}) => props.action(Target.STREET, target.value)}
          />
        </div>
        <div className={styles.alley}>
          <span>کوچه</span>
          <input
            type="text"
            value={props.alley}
            onChange={({target}) => props.action(Target.ALLEY, target.value)}
          />
        </div>
        <div className={styles.plaque}>
          <span>پلاک</span>
          <input
            type="text"
            value={props.plaque}
            onChange={({target}) => props.action(Target.PLAQUE, target.value)}
          />
        </div>
      </div>
      <div className={styles.leftSide}>
        <div className={styles.postalCode}>
          <span>کدپستی</span>
          <input
            type="text"
            value={props.postalCode}
            onChange={({target}) =>
              props.action(Target.POSTAL_CODE, target.value)
            }
          />
        </div>

        <div className={styles.mobile}>
          <span>تلفن همراه</span>
          <input
            type="text"
            value={props.mobile}
            onChange={({target}) => props.action(Target.PHONE, target.value)}
          />
        </div>

        <div className={styles.telePhone}>
          <span>تلفن ثابت</span>
          <input
            type="text"
            value={props.tel}
            onChange={({target}) => props.action(Target.TEL, target.value)}
          />
        </div>

        <div className={styles.email}>
          <span>ایمیل</span>
          <input
            type="text"
            value={props.email}
            onChange={({target}) => props.action(Target.EMAIL, target.value)}
          />
        </div>

        <div className={styles.website}>
          <span>وب سایت</span>
          <input
            type="text"
            value={props.website}
            onChange={({target}) => props.action(Target.WEBSITE, target.value)}
          />
        </div>

        <div className={styles.setButton}>
          <button onClick={() => props.action(Target.NEXT_PAGE)}>
            <span>صفحه بعد</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerAddressForm;
