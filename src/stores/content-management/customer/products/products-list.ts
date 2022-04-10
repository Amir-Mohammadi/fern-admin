import {action, observable} from 'mobx';

import {Target} from '../../../../components/dataset/products-list';

import {categoryDropdownAdapter} from '../../../../utils/adapter';

import api from '../../../../api';

import {IAddProduct} from '../../../../api/models';

import {PopUpProps} from '../../../../components/pop-up';

export default class ProductsList {
  @observable loading: {
    status: boolean;
    message: string;
  } = {status: false, message: ''};

  @observable popUp: {status: boolean; data: PopUpProps} = {
    status: false,
    data: {
      title: '',
      message: '',
      onClose: () => {},
    },
  };

  @observable productEditingRow: {
    id: number;
    product: {name: string; img?: string};
    productIdInStock: string;
    price: number;
    inventory: number;
    type: string;
    category_id: number;
  } = {
    id: 0,
    product: {name: '', img: ''},
    productIdInStock: '',
    price: 0,
    inventory: 0,
    type: '',
    category_id: 0,
  };

  @observable productListHeaders: string[] = [
    'نام محصول',
    'شناسه کالا در انبار',
    'قیمت',
    'موجودی کالا',
    'نوع محصول',
    'دسته والد',
  ];

  @observable productListSearchInput: string = '';

  @observable productListSearchBarPlaceHolder: string = 'جستجو';

  @observable.ref categories: {title: string; id?: number}[] = [];

  @observable productListSearchBarIsVisible: boolean = true;

  @observable.ref productListRows: {
    id: number;
    product: {name: string; img?: string};
    productIdInStock: string;
    price: number;
    inventory: number;
    type: string;
    category_id: number;
  }[] = [];

  private onSearch = () => {};

  private onPublishProduct = (i: number) => {};

  private loadCategory = async () => {
    this.setLoading(true, 'درحال بارگیری لیست دسته بندی ها');
    try {
      var res = await api.v1.productCategories.index();
      const temp = categoryDropdownAdapter(res.data);
      this.categories = temp.map((category) => ({
        title: category.name,
        ...category,
      }));
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  };

  private deleteProduct = async (i: number) => {
    this.setPopUp(false);
    this.setLoading(true, `درحال حذف ${this.productListRows[i].product.name}`);
    try {
      const res = await api.v1.product.delete(this.productListRows[i].id);
      this.loadProductList();
    } catch (error) {
      this.setPopUp(true, {
        title: 'محصول حذف نشد',
        message: error.toString(),
        onClose: () => {
          this.setPopUp(false);
        },
        options: [
          {
            text: 'تلاش مجدد',
            type: 'submit',
            action: async () => this.deleteProduct(i),
          },
        ],
      });
    } finally {
      this.setLoading(false);
    }
  };

  private onArchiveProduct = (i: number) => {};

  private onEditProduct = (i: number) => {
    const temp = [...this.productListRows];
    temp[i] = this.productEditingRow;
    this.productListRows = temp;
  };

  private onMoreEditProduct = () => {};

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

  private loadProductList = async () => {
    try {
      this.setLoading(true, 'درحال بارگیری لیست محصولات');
      const res = await api.v1.product.index();

      const raw_data: IAddProduct[] = res.data;

      this.productListRows = raw_data.map((product) => ({
        category_id: product.category_id,
        id: product.id,
        inventory: 0,
        price: 0,
        product: {
          name: product.name,
        },
        productIdInStock: product.id.toString(),
        type: '0',
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  @action handleActions = (target: Target, value?: any) => {
    switch (target) {
      case Target.FORM_LOAD:
        this.loadProductList();
        this.loadCategory();
        break;
      case Target.ON_SEARCH:
        this.onSearch();
        break;

      case Target.PRODUCT_LIST_HEADERS:
        this.productListHeaders = value;
        break;
      case Target.PRODUCT_LIST_ROWS:
        this.productListRows = value;
        break;
      case Target.ON_PUBLISH:
        this.onPublishProduct(value);
        break;
      case Target.ON_DELETE:
        this.setPopUp(true, {
          title: 'حذف محصول',
          message: `آیا میخواهید محصول ${this.productListRows[value].product.name} را حذف کنید ؟`,
          onClose: () => {
            this.setPopUp(false);
          },
          options: [
            {
              text: 'بله',
              type: 'submit',
              action: async () => this.deleteProduct(value),
            },
            {
              text: 'خیر',
              type: 'cancel',
              action: () => {
                this.setPopUp(false);
              },
            },
          ],
        });

        break;
      case Target.ON_ARCHIVE:
        this.onArchiveProduct(value);
        break;
      case Target.ON_EDIT:
        this.onEditProduct(value);
        break;
      case Target.ON_MORE_EDIT:
        this.onMoreEditProduct();
        break;
      case Target.SET_EDITING_ROW:
        this.productEditingRow = {...this.productListRows[value]};
        this.productEditingRow.product = {
          ...this.productListRows[value].product,
        };
        break;
      case Target.ON_ROW_CHANGE:
        this.productEditingRow = value;
        break;
      default:
        break;
    }
  };
}

export interface InjectedProductsListStore {
  productsList: ProductsList;
}
