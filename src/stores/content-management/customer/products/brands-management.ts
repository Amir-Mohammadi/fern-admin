import {action, observable} from 'mobx';

import {Target as brandInputType} from '../../../../components/forms/brands-management';
import {
  brandRow,
  Target as brandListType,
} from '../../../../components/dataset/brands-list';

import api from '../../../../api';

import {IBrand} from '../../../../api/models';

import {STATIC_TEMP_FILE} from '../../../../utils/statics';
import {PopUpProps} from '../../../../components/pop-up';
import BrandsManagementService from '../../../../services/content-management/customer/products/brands-management.service';

type Target = brandInputType | brandListType;

export default class BrandsManagement {
  brandManagementService: BrandsManagementService;

  constructor() {
    this.brandManagementService = new BrandsManagementService();
  }

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

  @observable brandImageUrl: string = '';

  @observable name: string = '';
  @observable urlTitle: string = '';
  @observable browserTitle: string = '';
  @observable metaDescription: string = '';
  @observable description: string = '';

  @observable imageTitle: string = '';
  @observable imageAlt: string = '';

  @observable brandsListHeader: string[] = [
    'تصویر',
    'نام',
    'عنوان مرورگر',
    'عنوان لینک',
  ];
  @observable brandsList: Array<brandRow> = [];
  @observable brandEditingRow: {
    id: number;
    name: string;
    logo: string;
    englishName: string;
  } = {id: 0, name: '', logo: '', englishName: ''};

  private _brand_image_id: string = '';

  private onSearch = () => {};

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

  private addBrand = async () => {
    try {
      const brand: IBrand = {
        image_id: this._brand_image_id,
        name: this.name,
        browser_title: this.browserTitle,
        image_alt: this.imageAlt,
        image_title: this.imageTitle,
        meta_description: this.metaDescription,
        url_title: this.urlTitle,
        description: this.description,
      };

      const res = await this.brandManagementService.addBrand(brand);
    } catch (error) {
      console.log(error);
    } finally {
      this.loadBrand();
    }
  };

  private onEditBrand = async () => {};

  private onDeleteBrand = async (i: number) => {
    const target_id = this.brandsList[i].id;
    try {
      const res = await this.brandManagementService.onDeleteBrand(target_id);
      this.loadBrand();
    } catch (error) {
      console.log(error);
    }
  };

  private loadBrand = async () => {
    try {
      this.brandsList = await this.brandManagementService.loadBrand();
    } catch (e) {
      console.log(e);
    }
  };

  private selectBrandImage = async (files) => {
    if (files && files[0]) {
      const data = new FormData();
      data.append('files', files[0]);

      try {
        const res = await api.v1.fileUpload.upload(data);
        this._brand_image_id = res.data[0];
        this.brandImageUrl = `${STATIC_TEMP_FILE}${this._brand_image_id}`;
      } catch (error) {
        console.log(error);
      }
    }
  };

  @action handleActions = (target: Target, value?: any) => {
    switch (target) {
      case brandInputType.ON_CHANGE_NAME:
        this.name = value;
        break;
      case brandInputType.ON_CHANGE_URL_TITLE:
        this.urlTitle = value;
        break;
      case brandInputType.ON_CHANGE_BROWSER_TITLE:
        this.browserTitle = value;
        break;
      case brandInputType.ON_CHANGE_DESCRIPTION:
        this.description = value;
        break;
      case brandInputType.ON_CHANGE_IMAGE_ALT:
        this.imageAlt = value;
        break;
      case brandInputType.ON_CHANGE_IMAGE_TITLE:
        this.imageTitle = value;
        break;
      case brandInputType.ON_CHANGE_META_DESCRIPTION:
        this.metaDescription = value;
        break;
      case brandInputType.ADD_IMAGE:
        this.selectBrandImage(value);
        break;
      case brandInputType.ON_SUBMIT:
        this.addBrand();
        break;
      case brandListType.ON_DELETE:
        this.onDeleteBrand(value);
        break;
      case brandListType.FORM_LOAD:
        this.loadBrand();
        break;
      default:
        break;
    }
  };
}

export interface InjectedBrandsManagementStore {
  brandsManagement: BrandsManagement;
}
