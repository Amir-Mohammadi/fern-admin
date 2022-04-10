import {UserRole} from '../services/user-management/user-role.enum';

export interface IBrand {
  id?: 0;
  name: string;
  url_title: string;
  image_title: string;
  image_alt: string;
  image_id: string;
  row_version?: string;
  browser_title: string;
  meta_description: string;
  description: string;
}

export interface IColorGet {
  product_id: number;
  color_id: number;
  color: {
    id: number;
    name: string;
    code: number;
    row_version: string | null;
  };
}
export interface IProductPriceSet {
  city_id: number;
  color_id: number;
  price: number;
  min_price: number;
  max_price: number;
  discount: number;
  is_published: boolean;
}

export interface IProvince {
  id: number;
  name: string;
  area_code: number;
  row_version: string | null;
}
export interface ICities {
  id: number;
  name: string;
  province: {
    id: number;
    name: string;
    area_code: number;
    row_version: string | null;
  };
  row_version: string | null;
  province_id: number;
}

export interface ICategoryPropertyRES {
  id: number;
  title: string;
  type: number;
  has_multiple: boolean;
  catalog_id: number;
  reference_id: number | null;
  is_main: boolean;
  order: number;
  row_version: string | null;
}

export interface IProductCategory {
  id?: number;
  name: string;
  url_title: string;
  browser_title: string;
  meta_description: string;
  parent_id: number | null;
  explanation: string;
  is_archive?: boolean;
  row_version?: string;
}
export interface IAddProductCategoryRes {
  id: 0;
}

export interface IAddProduct {
  id: number;
  name: string;
  url_title: string | null;
  browser_title: string;
  meta_description: string;
  category_id: number;
  brand_id: number;
  row_version: string | null;
}
export interface IProductRes {
  id: number;
  name: string;
  url_title: string;
  browser_title: string;
  meta_description: string;
  category_id: number;
  brand_id: number;
  default_product_color: {
    product_id: number;
    color_id: number;
    color: {
      id: number;
      name: string;
      code: number;
      row_version: string | null;
    };
  };
  preview_product_image: {
    id: number;
    image_id: string;
    order: number;
    image_alt: string;
    image_title: string;
    row_version: string | null;
  };
  row_version: string | null;
  brief_description: string;
  brand_name: string;
  price: number;
  discount: number;
  discount_type: number;
}

export interface IAddProductImages {
  id: number;
  image_id: string;
  order: number;
  image_alt: string;
  image_title: string;
  row_version: string | null;
}

export interface IPatchProductImage {
  image_alt: string;
  image_title: string;
  row_version: string | null;
}

export interface IAddProductProperty {
  id: number;
  product_category_property_id: number;
  value: string | number;
  extra_key: string | null;
  row_version: string | null;
}

export interface IProductPropertyRES {
  id: number;
  product_category_property_id: number;
  product_category_property: {
    id: number;
    title: string;
    type: number;
    has_multiple: boolean;
    catalog_id: number;
    reference_id: number;
    is_main: boolean;
    order: number;
    row_version: string;
  };
  extra_key: string;
  value: string;
  row_version: string;
}
export interface IAddProductTag {
  text: string;
}

export interface IProductCategoryProperty {
  id?: number;
  title: string;
  type: number;
  has_multiple?: boolean;
  catalog_id?: number;
  reference_id?: number;
  is_main?: boolean;
  order?: number;
  row_version?: string;
  show_in_filter?: boolean;
}
export interface IAddProductCategoryPropertyRes {
  id: number;
}

export interface IAddProductCategoryRES {
  id: number;
  name: string;
  parent_id: number | null;
  explanation: string | null;
  row_version: string | null;
  is_archive: boolean;
}

export interface IAddProductBrochure {
  id: 0;
  html: string;
  row_version: string | null;
}
export interface IProductImageRES {
  id: number;
  image_id: string;
  order: number;
  image_alt: string;
  image_title: string;
  row_version: string;
}
export interface ILoginREQ {
  email: string;
  password: string;
}
export interface ILoginRES {
  user_id: number;
  token: string;
}

export interface IRegisterViaEmailREQ {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  birthdate: string;
}

export interface IGetOrderItemsById {
  id: number;
  product_id: number;
  preview_product_image: {
    id: number;
    image_id: string;
    order: number;
    image_alt: string;
    image_title: string;
    row_version: string;
  };
  product_name: string;
  product_category_name: string;
  brand_name: string;
  product_color: string;
  product_price: number;
  providerName: string;
  row_version: string | null;
}

export interface IGetOrder {
  id: number;
  total_price: number;
  customer_name: string;
  customer_email: string;
  created_at: string;
  updated_at: string;
  row_version: string | null;
}

export interface IGetOrderDetailById {
  id: number;
  customer_name: string;
  customer_email: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
  phone_number: string;
  tel_number: string;
  payment_tracking_code: string;
  created_at: string;
  updated_at: string;
  row_version: string | null;
}
export interface ICreateFileTag {
  text: string;
}

export interface IGetFile {
  id: string;
  ext: string;
  owners: number;
  access: number;
  row_version: string | null;
}

export interface IGetFileTag {
  text: string;
}

export interface IGetFileTagQuery {
  Tag?: string;
  q?: string;
  page_index?: number;
  page_size?: number;
  sort_by?: string;
  order?: string;
}

export interface IGetProductBrochure {
  id: number;
  html: string;
  attachments: Array<{
    id: number;
    product_brochur_id: number;
    file: {
      id: string;
      ext: string;
      owners: number;
      access: number;
      row_version: string;
    };
    row_version: string | null;
  }>;
  row_version: string | null;
}

export interface IAddProductSize {
  length: number;
  width: number;
  height: number;
  weight: number;
  row_version: string | null;
}

export interface ICreateUser {
  first_name: string | null;
  last_name: string | null;
  email: string;
  user_role: UserRole;
  phone: string;
}
export interface IAddProductColor {
  length: number;
  width: number;
  height: number;
  weight: number;
  row_version: string | null;
}

export interface IProductColorModel {
  product_id?: number;
  color_id: number;
  color?: IColorModel;
}

export interface IColorModel {
  id?: number;
  name: string;
  code: number;
  row_version?: string;
}
