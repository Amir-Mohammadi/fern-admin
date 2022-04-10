import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {InjectedEleselMessageStore, InjectedOrderListStore} from '../stores';

import CustomerServiceManagementScreen from '../screens/customer-services-management';

export type CustomerServiceManagementContainerProps = InjectedOrderListStore &
  InjectedEleselMessageStore;

@inject('orderList')
@inject('eleselMessage')
@observer
class CustomerServiceManagement extends Component<CustomerServiceManagementContainerProps> {
  render() {
    return (
      <CustomerServiceManagementScreen
        orderListProps={{
          loading: this.props.orderList.loading,
          popUp: this.props.orderList.popUp,
          rows: this.props.orderList.orderRows,
          productList: this.props.orderList.orderItems,
          informationDialog: this.props.orderList.orderDetail,
          action: (target, value) => {
            this.props.orderList.handleActions(target, value);
          },
        }}
        eleselMessage={{
          sendMessageForm: {
            title: this.props.eleselMessage.title,
            categories: this.props.eleselMessage.categories,
            text: this.props.eleselMessage.text,
            action: (target, value) => {
              this.props.eleselMessage.handleActions(target, value);
            },
          },
          productRequestMessage: {
            answerTitle: this.props.eleselMessage.answerTitle,
            table: {
              header: this.props.eleselMessage.tableHead,
              rowProductMessage: this.props.eleselMessage.rowProduct,
            },
            action: (target, value) => {
              this.props.eleselMessage.handleActions(target, value);
            },
          },
        }}
      />
    );
  }
}

export default CustomerServiceManagement as any;
