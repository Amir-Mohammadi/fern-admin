import {action, observable} from 'mobx';

import {Target} from '../../../../components/dataset/categories-list';
import {categoryDropdownAdapter} from '../../../../utils/adapter';
import {IProductCategory} from '../../../../api/models';
import {PopUpProps} from '../../../../components/pop-up';
import CategoriesListService from '../../../../services/content-management/customer/products/categories-list';

export default class CategoriesList {
  private categoriesListService: CategoriesListService;

  constructor() {
    this.categoriesListService = new CategoriesListService();
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

  @observable categoryListHeaders: string[] = [
    'نام دسته',
    'توضحات',
    'دسته والد',
  ];

  @observable.ref categories: {title: string; id?: number}[] = [];

  @observable categoryEditingRow: IProductCategory = {
    id: 0,
    name: '',
    parent_id: 0,
    url_title: '',
    browser_title: '',
    meta_description: '',
    explanation: '',
    row_version: '',
  };

  @observable pureCategories: IProductCategory[] = [];

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

  private loadCategory = async () => {
    this.setLoading(true, 'درحال بارگیری لیست دسته بندی ها');
    try {
      this.pureCategories = await this.categoriesListService.loadCategories();
      this.categoriesToDropdown();
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  };

  private categoriesToDropdown = () => {
    const temp = categoryDropdownAdapter(this.pureCategories);
    this.categories = temp.map((category) => ({
      title: category.name,
      ...category,
    }));
  };

  private removeCategory = async (id) => {
    try {
      var res = await this.categoriesListService.removeCategory(id);
    } catch (e) {
      console.log(e);
    } finally {
      this.loadCategory();
    }
  };

  private updateCategory = async () => {
    try {
      var res = await this.categoriesListService.updateCategory(
        this.categoryEditingRow,
      );

      this.loadCategory();
    } catch (error) {
      console.log(error);
    }
  };

  @action handleActions = (target: Target, value?: any) => {
    switch (target) {
      case Target.FORM_LOAD:
        this.loadCategory();
        break;
      case Target.ON_ARCHIVE:
        this.loadCategory();
        break;
      case Target.ON_DELETE:
        this.removeCategory(value);
        break;
      case Target.ON_EDIT:
        this.updateCategory();
        break;
      case Target.ON_PUBLISH:
        this.loadCategory();
        break;
      case Target.ON_ROW_CHANGE:
        this.categoryEditingRow = value;
        break;
      case Target.ON_SEARCH:
        this.loadCategory();
        break;
      case Target.SET_EDITING_ROW:
        this.categoryEditingRow = {...this.pureCategories[value]};
        break;

      default:
        break;
    }
  };
}

export interface InjectedCategoriesListStore {
  categoriesList: CategoriesList;
}
