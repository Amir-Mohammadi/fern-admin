import api from '../../../../api';
import {
  IGetOrder,
  IGetOrderDetailById,
  IGetOrderItemsById,
} from '../../../../api/models';
import {Row as OrderRow} from '../../../../components/dataset/customer-order-list';
import {Row as OrderItemRow} from '../../../../components/order-item-list';
import {OrderDetailDialogProps} from '../../../../components/order-detail-dialog';
import {STATIC_FILE} from '../../../../utils/statics';

export default class OrderListService {
  async getAllOrders(): Promise<Array<OrderRow>> {
    try {
      const orders = await api.v1.order.getAllOrders();
      return this.orderAdapter(orders.data);
    } catch (error) {
      throw error;
    }
  }

  async getOrderDetail(orderId): Promise<OrderDetailDialogProps> {
    try {
      const detail = await api.v1.order.getOrderDetail(orderId);

      return this.orderDetailAdapter(detail.data);
    } catch (error) {}
  }

  async getOrderItems(orderId: number): Promise<Array<OrderItemRow>> {
    try {
      const items = await api.v1.order.getOrderItem(orderId);

      return this.orderItemAdapter(items.data);
    } catch (error) {
      throw error;
    }
  }

  orderAdapter = (orders: Array<IGetOrder>): Array<OrderRow> => {
    const adaptedOrders: Array<OrderRow> = [];

    orders.forEach((item) => {
      adaptedOrders.push({
        id: item.id,
        customerEmail: item.customer_email,
        customerName: item.customer_name,
        totalPrice: item.total_price,
        createdAt: item.created_at,
        rowVersion: item.row_version,
      });
    });

    return adaptedOrders;
  };

  orderDetailAdapter = (
    detail: IGetOrderDetailById,
  ): OrderDetailDialogProps => {
    const adaptedOrderDetail: OrderDetailDialogProps = {
      address: detail.address,
      city: detail.city,
      createdAt: detail.created_at,
      customerEmail: detail.customer_email,
      customerName: detail.customer_name,
      orderId: detail.id,
      paymentTrackingCode: detail.payment_tracking_code,
      phoneNumber: detail.phone_number,
      postalCode: detail.postal_code,
      province: detail.province,
      telNumber: detail.tel_number,
    };

    return adaptedOrderDetail;
  };

  orderItemAdapter = (
    orderItems: Array<IGetOrderItemsById>,
  ): Array<OrderItemRow> => {
    const adaptedOrderItems: Array<OrderItemRow> = [];

    orderItems.forEach((item) => {
      adaptedOrderItems.push({
        brandName: item.brand_name,
        id: item.id,
        productCategoryName: item.product_category_name,
        productColor: item.product_color,
        productId: item.product_id,
        productImage: {
          alt: item.preview_product_image.image_alt,
          src: STATIC_FILE(
            item.preview_product_image.image_id,
            item.preview_product_image.row_version,
          ),
          title: item.preview_product_image.image_title,
        },
        productName: item.product_name,
        productPrice: item.product_price,
        providerName: item.providerName,
        rowVersion: item.row_version,
      });
    });

    return adaptedOrderItems;
  };
}
