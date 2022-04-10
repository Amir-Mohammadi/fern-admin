import axios, {AxiosResponse, Method} from 'axios';
import https from 'https';
import {getToken} from '../utils/auth-checker';
import {API, ROUTES} from '../utils/statics';
import {
  IAddProduct,
  IAddProductBrochure,
  IProductCategory,
  IProductCategoryProperty,
  IAddProductImages,
  IAddProductProperty,
  IAddProductTag,
  IGetOrder,
  IGetOrderDetailById,
  IGetOrderItemsById,
  ICreateFileTag,
  ILoginREQ,
  IPatchProductImage,
  IGetFile,
  IGetFileTag,
  IGetFileTagQuery as IGetFileQuery,
  IGetProductBrochure,
  IAddProductSize,
  IBrand,
  ICreateUser,
  IProductColorModel,
  IColorModel,
  IProductRes,
  IProvince,
  ICities,
  IColorGet,
  IProductPriceSet,
  IAddProductCategoryRes,
  IAddProductCategoryPropertyRes,
} from './models';

class Api {
  private async send(
    method: Method,
    url: string,
    data?: any,
    params?: any,
    file?: boolean,
  ): Promise<AxiosResponse> {
    try {
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, POST, GET, PUT',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json',
      };
      const res = await axios(
        file
          ? {
              method,
              url,
              data,
              params,
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: getToken(),
              },
            }
          : {
              method,
              url,
              data,
              params,
              headers: {
                Authorization: getToken(),
              },
            },
      );

      return res;
    } catch (e) {
      throw e;
    }
  }

  v1 = {
    auth: {
      login: (data: ILoginREQ) => {
        return this.send('POST', `${API.V1}/${ROUTES.ADMIN}/login`, data);
      },
      registerViaEmail: (data) => {
        return this.send(
          'POST',
          `${API.V1}/${ROUTES.USERS}/register-via-email`,
          data,
        );
      },
    },
    brand: {
      create: (data: IBrand): Promise<AxiosResponse<{id: number}>> => {
        return this.send('POST', `${API.V1}/${ROUTES.BRANDS}`, data);
      },
      getAllBrands: (): Promise<AxiosResponse<IBrand[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.BRANDS}`);
      },
      update: () => {},
      delete: (brandId) => {
        return this.send('DELETE', `${API.V1}/${ROUTES.BRANDS}/${brandId}`);
      },
      read: () => {},
    },
    user: {
      create: (data: ICreateUser) => {
        return this.send('POST', `${API.V1}/${ROUTES.USERS}`, data);
      },
    },
    categoryProperties: {
      create: (
        data: IProductCategoryProperty,
        categoryId: number,
      ): Promise<AxiosResponse<IAddProductCategoryPropertyRes>> => {
        return this.send(
          'POST',
          `${API.V1}/${ROUTES.PRODUCT_CATEGORIES}/${categoryId}/properties`,
          data,
        );
      },
      read: (
        categoryId: number,
      ): Promise<AxiosResponse<IProductCategoryProperty[]>> => {
        return this.send(
          'GET',
          `${API.V1}/${ROUTES.PRODUCT_CATEGORIES}/${categoryId}/properties`,
        );
      },
      update: (
        data: IProductCategoryProperty,
        categoryId: number,
        propertyId: number,
      ) => {
        return this.send(
          'PUT',
          `${API.V1}/${ROUTES.PRODUCT_CATEGORIES}/${categoryId}/properties/${propertyId}`,
          data,
        );
      },
      delete: (categoryId: number, propertyId: number) => {
        return this.send(
          'DELETE',
          `${API.V1}/${ROUTES.PRODUCT_CATEGORIES}/${categoryId}/properties/${propertyId}`,
        );
      },
    },
    fileUpload: {
      upload: (data) => {
        return this.send(
          'POST',
          `${API.V1}/${ROUTES.FILES}/upload`,
          data,
          true,
        );
      },
      store: (uuid: string) => {
        return this.send(
          'POST',
          `${API.V1}/${ROUTES.FILES}/store?imageId=${uuid}`,
        );
      },
      createFileTag: (data: ICreateFileTag, uuid: string) => {
        return this.send(
          'POST',
          `${API.V1}/${ROUTES.FILES}/${uuid}/tags`,
          data,
        );
      },
      getFiles: (
        params: IGetFileQuery,
      ): Promise<AxiosResponse<Array<IGetFile>>> => {
        return this.send('GET', `${API.V1}/${ROUTES.FILES}`, null, params);
      },
      getTags: (): Promise<AxiosResponse<Array<IGetFileTag>>> => {
        return this.send('GET', `${API.V1}/${ROUTES.FILES}/tags`);
      },
      read: (imageId) => {},
    },
    order: {
      getAllOrders: (): Promise<AxiosResponse<Array<IGetOrder>>> => {
        return this.send('GET', `${API.V1}/${ROUTES.ORDERS}`);
      },
      getOrderById: (id: number): Promise<AxiosResponse<IGetOrder>> => {
        return this.send('GET', `${API.V1}/${ROUTES.ORDERS}/${id}`);
      },
      getOrderDetail: (
        id: number,
      ): Promise<AxiosResponse<IGetOrderDetailById>> => {
        return this.send('GET', `${API.V1}/${ROUTES.ORDERS}/${id}/detail`);
      },
      getOrderItem: (
        id: number,
      ): Promise<AxiosResponse<Array<IGetOrderItemsById>>> => {
        return this.send('GET', `${API.V1}/${ROUTES.ORDERS}/${id}/items`);
      },
    },
    product: {
      create: async (data: IAddProduct) => {
        const res = await this.send(
          'POST',
          `${API.V1}/${ROUTES.PRODUCTS}`,
          data,
        );
        if (res.status == 201) {
          return res;
        }

        throw new Error('محصول ثبت نشد ');
      },
      read: (id: number) => {
        return this.send('GET', `${API.V1}/${ROUTES.PRODUCTS}/${id}`);
      },
      update: (data: IAddProduct, id: number) => {
        return this.send('PUT', `${API.V1}/${ROUTES.PRODUCTS}/${id}`, data);
      },
      delete: (id: number) => {
        return this.send('DELETE', `${API.V1}/${ROUTES.PRODUCTS}/${id}`);
      },
      index: (): Promise<AxiosResponse<Array<IProductRes>>> => {
        return this.send('GET', `${API.V1}/${ROUTES.PRODUCTS}`);
      },
    },
    productBrochure: {
      create: (data: IAddProductBrochure, productId: number) => {
        return this.send(
          'POST',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/brochure`,
          data,
        );
      },
      read: (
        productId: number,
      ): Promise<AxiosResponse<IGetProductBrochure>> => {
        return this.send(
          'GET',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/brochure`,
        );
      },
    },
    productCategories: {
      create: (
        data: IProductCategory,
      ): Promise<AxiosResponse<IAddProductCategoryRes>> => {
        return this.send(
          'POST',
          `${API.V1}/${ROUTES.PRODUCT_CATEGORIES}`,
          data,
        );
      },
      index: (): Promise<AxiosResponse<IProductCategory[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.PRODUCT_CATEGORIES}`);
      },
      read: (id: number) => {
        return this.send('GET', `${API.V1}/${ROUTES.PRODUCT_CATEGORIES}/${id}`);
      },
      update: (data: IProductCategory): Promise<AxiosResponse<void>> => {
        return this.send(
          'PUT',
          `${API.V1}/${ROUTES.PRODUCT_CATEGORIES}/${data.id}`,
          data,
        );
      },
      delete: (id: number): Promise<AxiosResponse<void>> => {
        return this.send(
          'DELETE',
          `${API.V1}/${ROUTES.PRODUCT_CATEGORIES}/${id}`,
        );
      },
    },
    productColor: {
      getProductColors: (
        productId: number,
      ): Promise<AxiosResponse<IColorGet[]>> => {
        return this.send(
          'GET',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/colors`,
        );
      },
      addProductColor: (data: IProductColorModel, productId: number) => {
        return this.send(
          'POST',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/colors`,
          data,
        );
      },
    },
    productImages: {
      create: (data: IAddProductImages, productId: number) => {
        return this.send(
          'POST',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/images`,
          data,
        );
      },
      read: () => {},
      index: (productId: number) => {
        return this.send(
          'GET',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/images`,
        );
      },
      patch: (data: IPatchProductImage, productId: number, imageId: number) => {
        return this.send(
          'PATCH',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/images/${imageId}`,
          data,
        );
      },
      delete: (productId: number, imageId: number) => {
        return this.send(
          'DELETE',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/images/${imageId}`,
        );
      },
      preview: (imageId: number, productId: number) => {
        return this.send(
          'POST',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/images/${imageId}/set-preview`,
        );
      },
    },
    productPrice: {
      create: (data: IProductPriceSet, productId: number) => {
        return this.send(
          'POST',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/prices`,
          data,
        );
      },
    },
    productProperties: {
      create: (data: IAddProductProperty, productId: number) => {
        return this.send(
          'POST',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/properties`,
          data,
        );
      },
      index: (productId: number) => {
        return this.send(
          'GET',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/properties`,
        );
      },
      read: () => {},
      update: (
        data: IAddProductProperty,
        productId: number,
        propertyId: number,
      ) => {
        return this.send(
          'PUT',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/properties/${propertyId}`,
          data,
        );
      },
      delete: (productId: number, propertyId: number) => {
        return this.send(
          'DELETE',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/properties?propertyId=${propertyId}`,
        );
      },
    },
    productTags: {
      create: (data: IAddProductTag, productId: number) => {
        return this.send(
          'POST',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/tags`,
          data,
        );
      },
      index: (productId: number) => {
        return this.send(
          'GET',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/tags`,
        );
      },
      read: () => {},
      update: () => {},
      delete: (productId: number, tagId: number) => {
        return this.send(
          'DELETE',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/tags/${tagId}`,
        );
      },
    },
    productSize: {
      create: (data: IAddProductSize, productId: number) => {
        return this.send(
          'POST',
          `${API.V1}/${ROUTES.PRODUCTS}/${productId}/product-shipping-info`,
          data,
        );
      },
    },
    color: {
      create: (data: IColorModel) => {
        return this.send('POST', `${API.V1}/${ROUTES.COLORS}`, data);
      },
      getAllColors: (): Promise<AxiosResponse<Array<IColorModel>>> => {
        return this.send('GET', `${API.V1}/${ROUTES.COLORS}`);
      },
    },
    province: {
      getProvinces: (): Promise<AxiosResponse<IProvince[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.PROVINCES}`);
      },
      getCities: (provinceId: number): Promise<AxiosResponse<ICities[]>> => {
        return this.send(
          'GET',
          `${API.V1}/${ROUTES.PROVINCES}/${provinceId}/cities`,
        );
      },
    },
  };
}

const api = new Api();
export default api;
