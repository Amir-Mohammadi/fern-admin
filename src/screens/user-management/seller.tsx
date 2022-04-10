import React, {useState} from 'react';
import AddButtonBG, {AddButtonBGProps} from '../../components/add-button-bg';
import Alert from '../../components/alert/alert';
import ContractInfo, {ContractInfoProps} from '../../components/contract-info';
import DataSet, {DataSetProps} from '../../components/dataset';
import SellerAddressForm, {
  SellerAddressFormProps,
} from '../../components/seller-address-form';
import SellerInfoForm, {
  SellerInfoFormProps,
} from '../../components/seller-info-form';
import VerticalTabBar from '../../components/vertical-tab-bar';
import {CONTRACT_INFO, SELLER_ADDRESS, SELLER_INFO} from '../../utils/muck';

import styles from './user-management.module.scss';

interface Props {
  addButtonBG: AddButtonBGProps;
  sellerDataSet: DataSetProps;
  sellerInfo: SellerInfoFormProps;
  sellerAddress: SellerAddressFormProps;
  contractInfo: ContractInfoProps;
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
}

export type SellerProps = Props;

const Seller: React.FC<SellerProps> = (props) => {
  const [addMode, setAddMode] = useState(false);
  const [state, setState] = useState(props.selectedIndex);
  return (
    <div className={styles.tabContainer}>
      {!addMode ? (
        <div className={styles.tabContainer}>
          <div className={styles.addProductFormBX}>
            <AddButtonBG
              {...props.addButtonBG}
              onClick={() => setAddMode(true)}
            />
          </div>
          <div className={styles.dataSetFormBX}>
            <div className={styles.dataSet}>
              <DataSet {...props.sellerDataSet} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.verticalTab}>
          <Alert text={'asd'} />
          <div className={styles.sellerInfoFormBx}>
            <VerticalTabBar
              items={[
                {
                  title: ' اطلاعات فروشنده',
                  content: <SellerInfoForm {...props.sellerInfo} />,
                },
                {
                  title: 'اطلاعات آدرس',
                  content: <SellerAddressForm {...props.sellerAddress} />,
                },
                {
                  title: 'اطلاعات قرارداد',
                  content: <ContractInfo {...props.contractInfo} />,
                },
              ]}
              selectedIndex={props.selectedIndex}
              setSelectedIndex={(index) => props.setSelectedIndex(index)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Seller;

// title: ' اطلاعات فروشنده',
// content: <SellerInfoForm {...SELLER_INFO} />,
// },
// {
// title: 'اطلاعات آدرس',
// content: <SellerAddressForm {...SELLER_ADDRESS} />,
// },
// {
// title: 'اطلاعات قرارداد',
// content: <ContractInfo {...CONTRACT_INFO} />,
// },
