import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import UserManagementScreen from '../screens/user-management';

import {
  InjectedCustomerStore,
  InjectedManagerStore,
  InjectedSellerStore,
} from '../stores';
import {ADD_PRODUCT} from '../utils/muck';

export type UserManagementContainerProps = InjectedManagerStore &
  InjectedCustomerStore &
  InjectedSellerStore;

@inject('manager')
@inject('customer')
@inject('seller')
@observer
class UserManagement extends Component<UserManagementContainerProps> {
  render() {
    return (
      <UserManagementScreen
        addNewUserForm={{
          phone: this.props.manager.phone,
          userType: this.props.manager.userType,
          email: this.props.manager.email,
          selectedUserType: this.props.manager.selectedUserType,
          action: (target, value) => {
            this.props.manager.handleActions(target, value);
          },
        }}
        dataSet={{
          header: {
            title: this.props.manager.title,
            searchBar: this.props.manager.searchBar,
          },
          table: {
            header: this.props.manager.header,
            rows: this.props.manager.rows,
            actions: this.props.manager.handleTableActions,
          },
          action: (target, value) => {
            this.props.manager.handleActions(target, value);
          },
          editor: this.props.manager.editor,
        }}
        // action={() => {}}
        // header={{
        //   title: this.props.seller.mainTitle,
        //   searchBar: this.props.seller.searchBar,
        // }}
        // table={{
        //   header: this.props.seller.header,
        //   rows: this.props.seller.rows,
        //   actions: this.props.seller.handleTableActions,
        // }}
        // editor={this.props.seller.editor}
        customerList={{
          header: {
            title: this.props.customer.title,
            searchBar: this.props.customer.searchBar,
          },
          table: {
            header: this.props.customer.header,
            rows: this.props.customer.rows,
            actions: this.props.customer.handleTableActions,
          },
          action: (target, value) => {
            this.props.customer.handleActions(target, value);
          },
          editor: this.props.customer.editor,
        }}
        memberList={{
          header: {
            title: this.props.customer.title,
            searchBar: this.props.customer.searchBar,
          },
          table: {
            header: this.props.customer.header,
            rows: this.props.customer.rows,
            actions: this.props.customer.handleTableActions,
          },
          action: (target, value) => {
            this.props.customer.handleActions(target, value);
          },
          editor: this.props.customer.editor,
        }}
        sellerDataSet={{
          header: {
            title: this.props.seller.title,
            searchBar: this.props.seller.searchBar,
          },
          table: {
            header: this.props.seller.header,
            rows: this.props.seller.rows,
            actions: this.props.seller.handleTableActions,
          },
          action: (target, value) => {
            this.props.seller.handleActions(target, value);
          },
          editor: this.props.seller.editor,
        }}
        addButtonBG={{title: this.props.seller.buttonTitle, onClick: () => {}}}
        sellerInfo={{
          username: this.props.seller.infoUserName,
          password: this.props.seller.password,
          naturalNumber: this.props.seller.infoNaturalNumber,
          naturalCode: this.props.seller.infoNaturalCode,
          name: this.props.seller.infoName,
          gender: this.props.seller.infoGender,
          Personality: this.props.seller.infoPersonality,
          birthDate: this.props.seller.infoBirthDate,
          action: (target, value) => {
            this.props.seller.handleActions(target, value);
          },
        }}
        sellerAddress={{
          cities: this.props.seller.cities,
          states: this.props.seller.states,
          alley: this.props.seller.alley,
          email: this.props.seller.email,
          mobile: this.props.seller.mobile,
          plaque: this.props.seller.plaque,
          postalCode: this.props.seller.postalCode,
          selectedCity: this.props.seller.selectedCity,
          selectedState: this.props.seller.selectedState,
          street: this.props.seller.street,
          tel: this.props.seller.tel,
          website: this.props.seller.website,
          action: (target, value) => {
            this.props.seller.handleActions(target, value);
          },
        }}
        contractInfo={{
          contractCode: this.props.seller.contractCode,
          contractPath: this.props.seller.contractPath,
          createDate: this.props.seller.createDate,
          finishDate: this.props.seller.finishDate,
          action: (target, value) => {
            this.props.seller.handleActions(target, value);
          },
        }}
        selectedIndex={this.props.seller.selectedIndex}
        setSelectedIndex={(target) => this.props.seller.handleActions(target)}
      />
    );
  }
}

export default UserManagement as any;
