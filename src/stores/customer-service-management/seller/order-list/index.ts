import {action, observable} from 'mobx';
import {
  Row as OrderRows,
  Targets,
  orderListTargets,
} from '../../../../components/dataset/customer-order-list';
import {
  OrderDetailDialogProps,
  Target as orderDetailTargets,
} from '../../../../components/order-detail-dialog';

import {
  OrderItemListProps,
  Target as orderItemTargets,
} from '../../../../components/order-item-list';

import {PopUpProps} from '../../../../components/pop-up';
import OrderListService from '../../../../services/customer-service-management/seller/order-list';

import {ORDER_PRODUCT} from '../../../../utils/muck';
export default class OrderList {
  private OrderListService: OrderListService;

  constructor() {
    this.OrderListService = new OrderListService();
  }

  @observable popUp: {status: boolean; data: PopUpProps} = {
    status: false,
    data: {
      title: '',
      message: '',
      onClose: () => {},
    },
  };

  @observable loading: {
    status: boolean;
    message: string;
  } = {status: false, message: ''};

  @observable orderRows: Array<OrderRows> = [];

  @observable orderDetail: OrderDetailDialogProps = {
    address: '',
    city: '',
    createdAt: '',
    customerEmail: '',
    customerName: '',
    orderId: 0,
    paymentTrackingCode: '',
    phoneNumber: '',
    postalCode: '',
    province: '',
    telNumber: '',
  };

  @observable orderItems: OrderItemListProps = {
    loading: false,
    row: ORDER_PRODUCT,
  };

  private setLoading = (status: boolean, message: string = '') => {
    const temp = {...this.loading};
    temp.status = status;
    temp.message = message;

    this.loading = temp;
  };

  private setPopUp = (status: boolean, data?: PopUpProps) => {
    const temp = {...this.popUp};
    temp.status = status;
    temp.data = data || {
      title: '',
      message: '',
      onClose: () => {},
    };

    this.popUp = temp;
  };

  private async getAllOrders() {
    this.setLoading(true, 'درحال بارگیری لیست سفارش ها');
    try {
      this.setLoading(false);
      this.orderRows = await this.OrderListService.getAllOrders();
    } catch (error) {
      this.setLoading(false);
      console.log(error);
    }
  }

  private async getOrderDetail(orderId) {
    try {
      this.orderDetail = await this.OrderListService.getOrderDetail(orderId);
    } catch (error) {}
  }

  private async getOrderItems(orderId: number) {
    const temp = {...this.orderItems};
    temp.loading = true;
    this.orderItems = {...temp};
    try {
      temp.row = await this.OrderListService.getOrderItems(orderId);

      temp.loading = false;
      this.orderItems = {...temp};
    } catch (error) {
      temp.row = [];
      temp.loading = false;
      temp.error = error.toString();
      this.orderItems = {...temp};
    }
  }

  @action handleActions = (target: Targets, value?: any) => {
    switch (target) {
      case orderListTargets.FORM_LOAD:
        this.getAllOrders();
        break;
      case orderDetailTargets.FORM_LOAD:
        this.getOrderDetail(value);
        break;
      case orderItemTargets.LOAD_ORDER_ITEMS:
        this.getOrderItems(value);
        break;

      default:
        break;
    }
  };
}

export interface InjectedOrderListStore {
  orderList: OrderList;
}
