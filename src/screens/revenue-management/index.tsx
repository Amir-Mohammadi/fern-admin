import React, {useState} from 'react';
import styles from './revenue-management.module.scss';

import Customer, {CustomerProps} from './customer';
import Seller, {SellerProps} from './seller';
import TabBar from '../../components/tab-bar';
import LoadingDialog from '../../components/loading-dialog';
import PopUP, {PopUpProps} from '../../components/pop-up';

interface Props {
  customerScreen: CustomerProps;
  sellerScreen: SellerProps;
  loading: {
    status: boolean;
    message: string;
  };
  popUp: {status: boolean; data: PopUpProps};
}

export type RevenueManagementProps = Props;

const RevenueManagement: React.FC<RevenueManagementProps> = (props) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className={styles.container}>
      <TabBar
        items={[
          {
            title:'خریدار',
            content: <Customer {...props.customerScreen} />,
          },
          {title: 'فروشنده', content: <Seller {...props.sellerScreen} />},
        ]}
        handleSelect={(i) => {
          setTabIndex(i);
        }}
        selected={tabIndex}
      />
      {props.loading.status && (
        <LoadingDialog message={props.loading.message} />
      )}
      {props.popUp.status && <PopUP {...props.popUp.data} />}
    </div>
  );
};

export default RevenueManagement;
