import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import RevenueManagementScreen from '../screens/revenue-management';
import {InjectedRevenueManagementStore} from '../stores';

export type RevenueManagementContainerProps = InjectedRevenueManagementStore;

@inject('revenueManagement')
@observer
class RevenueManagement extends Component<RevenueManagementContainerProps> {
  render() {
    return (
      <RevenueManagementScreen
        sellerScreen={{
          productSearchValue: this.props.revenueManagement.productSearchValue,
          sellerBillSearchValue:
            this.props.revenueManagement.sellerBillSearchValue,
          productList: this.props.revenueManagement.productList,
          priceRangeForm: {
            to: this.props.revenueManagement.toPrice,
            from: this.props.revenueManagement.fromPrice,
            sellingPrice: this.props.revenueManagement.sellingPrice,
            provincesList: this.props.revenueManagement.provincesList,
            citiesList: this.props.revenueManagement.citiesList,
            colorList: this.props.revenueManagement.colorList,
            selectedProvince: this.props.revenueManagement.selectedProvince,
            selectedCities: this.props.revenueManagement.selectedCity,
            selectedColor: this.props.revenueManagement.selectedColor,
            isPublished: this.props.revenueManagement.isPublished,
          },
          action: this.props.revenueManagement.handleActions,
        }}
        customerScreen={{
          coupons: [],
          search: {coupon: '', customerBill: '', onChange: () => {}},
          statistics: [],
        }}
        loading={this.props.revenueManagement.loading}
        popUp={this.props.revenueManagement.popUp}
      />
    );
  }
}

export default RevenueManagement as any;
