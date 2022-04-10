import {
  IProductCategoryProperty,
  IAddProductCategoryRES,
  IProductImageRES,
  ICategoryPropertyRES,
  IGetOrderItemsById,
  IGetOrder,
  IGetOrderDetailById,
  IGetFile,
  IGetFileTag,
  IProductCategory,
} from '../api/models';
import {FeatureType} from '../components/forms/add-new-product';
import {Row as OrderItemRow} from '../components/order-item-list';
import {Row as OrderRow} from '../components/dataset/customer-order-list';
import {STATIC_FILE, STATIC_TEMP_FILE} from './statics';
import {CATEGORY_TYPE} from './types/enums';
import {OrderDetailDialogProps} from '../components/order-detail-dialog';

export const categoryDropdownAdapter = (categories: IProductCategory[]) => {
  const tree: {
    id: number;
    name: string;
    parent_id: number | null;
    explanation?: string | null;
    checksum?: string | null;
    child?: any;
  }[] = makeTree(categories);

  categories = traverse(tree, []);

  return categories;
};

export const rawFeatureToTree = (feature) => {
  const tree = makeFeatureRequestTree(feature);

  return tree;
};

// export const responseFeatureToTree = (feature: ICategoryPropertyRES[]) => {
//   const tree: FeatureType[] = makeFeatureResponseTree(feature);

//   return tree;
// };

export const fileResponseToGalleryImage = (
  files: Array<IGetFile>,
): Array<{fileKey: string; url: string}> => {
  const galleryImages: Array<{fileKey: string; url: string}> = [];

  files.forEach((file) => {
    galleryImages.push({
      fileKey: file.id,
      url: STATIC_FILE(file.id, file.row_version.replace('+', '%2B')),
    });
  });

  return galleryImages;
};

export const fileTagResponseToDropdownList = (
  fileTags: Array<IGetFileTag>,
): Array<{title: string}> => {
  const dropdown: Array<{title: string}> = [];
  fileTags.forEach((tag) => {
    dropdown.push({title: tag.text});
  });
  return dropdown;
};

export const productImageResponseToResult = (images: IProductImageRES[]) => {
  const temp: {
    id: number;
    fileKey: string;
    url: string;
    title: string;
    alt: string;
    row_version: string | null;
  }[] = [];
  images.forEach((image) => {
    temp.push({
      id: image.id,
      fileKey: image.image_id,
      url: `${STATIC_TEMP_FILE}${image.image_id}`,
      title: image.image_title,
      alt: image.image_alt,
      row_version: image.row_version,
    });
  });

  return temp;
};

export const featureToRequest = (
  feature,
  isMain,
  showInFilter,
  order,
): IProductCategoryProperty => {
  const F: IProductCategoryProperty = {
    ...feature,
    reference_id: feature.parentId || feature.reference_id,
    row_version: feature.row_version || null,
    catalog_id: feature.catalog_id || 0,
    id: feature.id || 0,
    has_multiple: feature.type == 3 || feature.type == CATEGORY_TYPE.extra,
    is_main: isMain,
    show_in_filter: showInFilter,
    order: 1 + order,
  };

  return F;
};

export const fetchOptions = (params) => {
  const options: any[] = [];

  params.forEach((param, i) => {
    param.child.forEach((ch) => {
      ch.child.forEach((option) => {
        options.push({
          ...option,
          parentId: option.reference_id,
          value: option.title,
        });
      });
    });
  });

  return options;
};

export const fetchMainFeature = (params: Array<IProductCategoryProperty>) => {
  const features: number[] = [];

  params.forEach((feature) => {
    if (feature.is_main) {
      features.push(feature.id);
    }
  });

  return features;
};
export const fetchFiltrableFeature = (
  params: Array<IProductCategoryProperty>,
) => {
  const features: number[] = [];

  params.forEach((feature) => {
    if (feature.show_in_filter) {
      features.push(feature.id);
    }
  });

  return features;
};

export const orderAdapter = (orders: Array<IGetOrder>): Array<OrderRow> => {
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

export const orderItemAdapter = (
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

export const orderDetailAdapter = (
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

export function makeFeatureResponseTree(
  feature,
  parent: number | null = null,
): Array<FeatureType> {
  return feature.reduce((r: any[], e, i) => {
    console.log(r);
    console.log(e);

    if (e.reference_id == parent && e.type == 0) {
      e.items = makeFeatureResponseTree(feature, e.id);
      e.otherFeatures = {
        labelText: '',
        valueText: '',
        values: [],
        action: () => {},
      };
      e.hasExtra = false;
      e.items.forEach((item) => {
        item.product_category_property_id = item.id;
        item.values = [];
        item.row_version = feature.row_version;
      });

      //e.items.length ? (e.items[i]['values'] = []) : null;
      r.push(e);
    }
    if (e.reference_id == parent && e.type > 0) {
      e.options = makeFeatureResponseTree(feature, e.id);
      r.push(e);
    }
    return r;
  }, []);
}

function makeFeatureRequestTree(feature, parent: number | null = null) {
  return feature.reduce(function (r: any[], e) {
    if (e.reference_id == parent) {
      e.child = makeFeatureRequestTree(feature, e.id);
      r.push(e);
    }
    return r;
  }, []);
}

function makeTree(
  data: {
    id?: number;
    name: string;
    parent_id: number | null;
    parentId?: number | null;
    explanation?: string | null;
    checksum?: string | null;
    child?: any;
  }[],
  parent: number | null = null,
) {
  return data.reduce(function (r: any[], e) {
    if (e.parent_id == parent) {
      e.child = makeTree(data, e.id);
      r.push(e);
    }
    return r;
  }, []);
}
function traverse(
  node: {
    id: number;
    name: string;
    parent_id: number | null;
    explanation?: string | null;
    checksum?: string | null;
    child?: any;
  }[],
  list: any[],
) {
  node.forEach((element, i) => {
    list.push(element);
    if (element.child.length) {
      element.child.forEach((item: any) => {
        item.name = element.name + '/' + item.name;
      });
      traverse(element.child, list);
    }
  });

  return list;
}
