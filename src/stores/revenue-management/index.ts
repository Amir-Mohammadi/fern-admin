import {action, observable} from 'mobx';
import {ListItem} from '../../components/list-accordion';
import {PopUpProps} from '../../components/pop-up';
import {Target as SellerTargets} from '../../screens/revenue-management/seller';
import {
  CitiesList,
  ColorsList,
  ProvincesList,
  Target as PriceRangeFormTarget,
} from '../../components/price-range';
import RevenueManagementService from '../../services/revenue-management';
import {IProductPriceSet} from '../../api/models';

type Targets = SellerTargets | PriceRangeFormTarget;

export default class RevenueManagement {
  revenueManagementService: RevenueManagementService;
  constructor() {
    this.revenueManagementService = new RevenueManagementService();
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

  @observable productList: Array<ListItem> = [];

  @observable provincesList: Array<ProvincesList> = [];
  @observable citiesList: Array<CitiesList> = [];
  @observable colorList: Array<ColorsList> = [];

  @observable selectedProvince: number = -1;
  @observable selectedCity: number = -1;
  @observable selectedColor: number = -1;

  @observable isPublished: boolean = true;

  @observable productSearchValue: string = '';
  @observable sellerBillSearchValue: string = '';
  @observable toPrice: string = '';
  @observable fromPrice: string = '';
  @observable sellingPrice: string = '';

  @observable selectedProductId: number = -1;

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

  private async loadProductsList() {
    this.setLoading(true);
    try {
      this.productList = await this.revenueManagementService.loadProductsList();
      this.setLoading(false);
    } catch (error) {
      this.setPopUp(true, {
        message: error,
        title: 'خطا',
        onClose: () => {
          this.setPopUp(false);
        },
      });
    }
  }

  private async LoadProvinceList() {
    try {
      this.provincesList =
        await this.revenueManagementService.loadProvincesList();
    } catch (error) {
      this.setPopUp(true, {
        message: error,
        title: 'خطا',
        onClose: () => {
          this.setPopUp(false);
        },
      });
    }
  }

  private async onSelectProvince(index: number) {
    this.selectedProvince = index;
    this.selectedCity = -1;
    this.setLoading(true);
    try {
      this.citiesList = await this.revenueManagementService.loadCitiesList(
        this.provincesList[index].id,
      );
      this.setLoading(false);
    } catch (error) {
      this.setLoading(false);
      this.setPopUp(true, {
        message: error,
        title: 'خطا',
        onClose: () => {
          this.setPopUp(false);
        },
      });
    }
  }

  private onSelectCity(index: number) {
    this.selectedCity = index;
  }
  private onSelectColor(index: number) {
    this.selectedColor = index;
  }
  private onToggleIsPublish() {
    this.isPublished = !this.isPublished;
  }

  private setSelectedProductId(index: number) {
    if (index > -1) {
      this.selectedProductId = this.productList[index].id;
    }
  }

  private async loadProductColors() {
    try {
      this.colorList = await this.revenueManagementService.loadProductColor(
        this.selectedProductId,
      );
    } catch (error) {}
  }

  private async createProductPrice() {
    this.setLoading(true);
    try {
      const price: IProductPriceSet = {
        city_id: this.citiesList[this.selectedCity].id,
        color_id: this.colorList[this.selectedColor].id,
        discount: 0,
        is_published: this.isPublished,
        max_price: parseInt(this.toPrice),
        min_price: parseInt(this.fromPrice),
        price: parseInt(this.sellingPrice),
      };
      await this.revenueManagementService.createProductPrice(
        price,
        this.selectedProductId,
      );
      this.setLoading(false);
    } catch (error) {
      this.setLoading(false);
      this.setPopUp(true, {
        message: error,
        title: 'خطا',
        onClose: () => {
          this.setPopUp(false);
        },
      });
    }
  }

  @action handleActions = (target: Targets, value?: any) => {
    switch (target) {
      case SellerTargets.FORM_LOAD:
        this.loadProductsList();
        this.LoadProvinceList();
        break;
      case SellerTargets.PRODUCT_SEARCH:
        this.productSearchValue = value;
        break;
      case SellerTargets.SELECTED_PRODUCT_ID:
        this.setSelectedProductId(value);
        this.loadProductColors();
        break;
      case PriceRangeFormTarget.ON_CHANGE_PROVINCE:
        this.onSelectProvince(value);
        break;
      case PriceRangeFormTarget.ON_CHANGE_CITY:
        this.onSelectCity(value);
        break;
      case PriceRangeFormTarget.ON_CHANCE_COLOR:
        this.onSelectColor(value);
        break;
      case PriceRangeFormTarget.ON_TOGGLE_IS_PUBLISH:
        this.onToggleIsPublish();
        break;
      case PriceRangeFormTarget.TO_VALUE:
        this.toPrice = value;
        break;
      case PriceRangeFormTarget.FROM_VALUE:
        this.fromPrice = value;
        break;
      case PriceRangeFormTarget.SELLING_PRICE_VALUE:
        this.sellingPrice = value;
        break;
      case PriceRangeFormTarget.ON_SUBMIT:
        this.createProductPrice();
        break;
      default:
        break;
    }
  };
}

export interface InjectedRevenueManagementStore {
  revenueManagement: RevenueManagement;
}
