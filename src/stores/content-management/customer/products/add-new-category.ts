import {action, observable} from 'mobx';
import {ProductFeatureInputItemProps} from '../../../../components/product-feature-input-item';

import {Target} from '../../../../components/forms/add-new-category';

import {
  categoryDropdownAdapter,
  featureToRequest,
  fetchFiltrableFeature,
  fetchMainFeature,
  fetchOptions,
  rawFeatureToTree,
} from '../../../../utils/adapter';

import api from '../../../../api';

import {
  ValidatorTypes,
  ValidationRES,
  Validator,
  Validate,
} from '../../../../utils/validate';

import {CATEGORY_TYPE} from '../../../../utils/types/enums';
import {PopUpProps} from '../../../../components/pop-up';
import {AxiosResponse} from 'axios';
import {
  IProductCategory,
  IProductCategoryProperty,
} from '../../../../api/models';
import AddNewCategoryService from '../../../../services/content-management/customer/products/add-new-category.service';

export default class AddNewCategory {
  private addNewCategoryService: AddNewCategoryService;

  constructor() {
    this.addNewCategoryService = new AddNewCategoryService();
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

  @observable categoryId: number = -1;
  @observable isMain: boolean = false;
  @observable showInFilter: boolean = false;

  @observable editingFeatureId: number = -1;
  @observable oldFeatureTitle: string = '';
  @observable hasExtra: boolean = false;
  @observable featuresTree: {
    child: {
      description?: string;
      id: number;
      parentId: number;
      title: string;
      type: number;
      isMain: boolean;
      showInFilter: boolean;
      hasMultiple: boolean;
    }[];
    id: number;
    title: string;
    type: number;
  }[] = [];
  @observable categoryTitle: {
    value: string;
    errorMessage: string | null;
    validators: Validator[];
  } = {
    value: '',
    errorMessage: '',
    validators: [
      {
        type: ValidatorTypes.REQUIRED,
      },
    ],
  };
  @observable categoryDescription: string = '';
  @observable featureTitle: string = '';
  @observable featureDescription: string = '';
  @observable featureType: {title: string}[] = [
    {title: 'بخش جدید'},
    {title: 'متن'},
    {title: 'عددی'},
    {title: 'چند انتخابی'},
    {title: 'تک انتخابی'},
  ];
  @observable selectedFeature: number = -1;
  @observable featureOptions: {
    id: number;
    parentId: number;
    value: string;
  }[] = [];
  @observable featureOptionTitle: string = '';
  @observable selectedParent: number = -1;
  @observable featuresParentsList: {
    title: string;
    id: number;
  }[] = [];
  @observable.ref categories: {title: string; id?: number}[] = [];
  @observable selectedCategory: number = -1;
  @observable selectedType: number = 0;
  @observable mainFeatures: number[] = [];
  @observable filterableFeatures: number[] = [];

  @observable pureCategories: {
    id: number;
    name: string;
    parent_id: number | null;
    explanation: string | null;
    row_version: string | null;
  }[] = [];

  @observable features: {
    id: number;
    title: string;
    type: number;
    items: ProductFeatureInputItemProps[];
  }[] = [];

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

  private addFeatureOption = async () => {
    const temp = [...this.featureOptions];

    var option: IProductCategoryProperty = {
      title: this.featureOptionTitle,
      type: CATEGORY_TYPE.text,
      reference_id: this.selectedFeature,
    };

    try {
      const res = await this.addNewCategoryService.addCategoryProperties(
        option,
        this.categoryId,
      );

      temp.push({
        id: res.id,
        parentId: this.selectedFeature,
        value: this.featureOptionTitle,
      });
      this.featureOptions = temp;
      this.featureOptionTitle = '';
    } catch (error) {}
  };

  private addCategory = async () => {
    this.setLoading(true, 'درحال ایجاد دسته جدید');
    const category: IProductCategory = {
      name: this.categoryTitle.value,
      parent_id: this.categories[this.selectedCategory].id || null,
      browser_title: '',
      meta_description: '',
      url_title: '',
      explanation: this.categoryDescription,
    };
    try {
      var res = await this.addNewCategoryService.addNewCategory(category);

      this.categoryId = res.id;

      this.setPopUp(true, {
        title: 'ثبت شد',
        message: `دسته بندی ${this.categoryTitle.value} با موفقیت ثبت شد.`,
        onClose: () => {
          this.setPopUp(false);
          this.addCategoryFormReset();
          this.loadCategory();
        },
      });
    } catch (e) {
      this.setPopUp(true, {
        title: 'خطا',
        message: ` ${e}`,
        onClose: () => {
          this.setPopUp(false);
        },
      });
    } finally {
      this.setLoading(false);
    }
  };

  private updateCategory = () => {
    this.setLoading(true);
    try {
      this.featuresTree.forEach(async (feature, i) => {
        const F = featureToRequest(feature, false, false, i);

        let feature_res: AxiosResponse;

        if (this.new_features_when_updating.indexOf(feature.id) >= 0) {
          F.id = 0;
          feature_res = await api.v1.categoryProperties.create(
            F,
            this.editing_category_id,
          );
        } else {
          feature_res = await api.v1.categoryProperties.update(
            F,
            this.editing_category_id,
            feature.id,
          );
          //feature.id = feature_res.data.id;
        }

        feature.id = feature_res.data.id;
        feature.child.forEach(async (child) => {
          //child.parentId = feature_res.data.id;
          const isMain = this.mainFeatures.includes(child.id);
          const isFiltrable = this.filterableFeatures.includes(child.id);
          const C = featureToRequest(child, isMain, isFiltrable, 0);

          let child_feature_res: AxiosResponse;

          if (this.new_features_when_updating.indexOf(child.id) >= 0) {
            C.id = 0;
            child_feature_res = await api.v1.categoryProperties.create(
              C,
              this.editing_category_id,
            );
          } else {
            child_feature_res = await api.v1.categoryProperties.update(
              C,
              this.editing_category_id,
              child.id,
            );
          }

          this.featureOptions.forEach(async (option) => {
            if (option.parentId == child.id) {
              const O = featureToRequest(
                {
                  ...option,
                  type: 1,
                  title: option.value,
                },
                false,
                false,
                0,
              );

              if (option.id == 0) {
                O.id = 0;
                // O.reference_id = child_feature_res.data.id;
                const ORes = await api.v1.categoryProperties.create(
                  O,
                  this.editing_category_id,
                );
              } else {
                const ORes = await api.v1.categoryProperties.update(
                  O,
                  this.editing_category_id,
                  option.id!,
                );
              }
            }
          });
        });
      });

      this.deleted_features.forEach(async (feature) => {
        const DRes = await api.v1.categoryProperties.delete(
          this.editing_category_id,
          feature,
        );
      });
      this.setPopUp(true, {
        title: 'به روز رسانی ',
        message: 'دسته بندی مورد نظر با موفقیت ویرایش شد',
        onClose: () => {
          this.featuresTree = [];
          this.featureOptions = [];
          this.featureOptionTitle = '';
          this.mainFeatures = [];
          this.filterableFeatures = [];
          this.selectedFeature = -1;
          this.editing_category_id = -1;
          this.setUpdateCategoryFeature(false);
          this.setPopUp(false);
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

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

  private removeFeatureOption = (index) => {
    const temp = [...this.featureOptions];
    this.deleted_features.push(temp[index].id);
    temp.splice(index, 1);

    this.featureOptions = temp;
    this.featureOptionTitle = '';
  };

  private addFeature = async () => {
    if (this.selectedParent >= 0) {
      const feat: IProductCategoryProperty = {
        title: this.featureTitle,
        is_main: this.isMain,
        show_in_filter: this.showInFilter,
        reference_id: this.featuresParentsList[this.selectedParent].id,
        type: this.selectedType == 4 ? CATEGORY_TYPE.list : this.selectedType,
        has_multiple: this.selectedType == CATEGORY_TYPE.list,
      };
      try {
        const res = await this.addNewCategoryService.addCategoryProperties(
          feat,
          this.categoryId,
        );
        const temp = [...this.featuresTree];

        const treeIndex = temp.findIndex(
          (feature) =>
            feature.id == this.featuresParentsList[this.selectedParent].id,
        );

        temp[treeIndex].child.push({
          id: res.id,
          title: this.featureTitle,
          isMain: this.isMain,
          showInFilter: this.showInFilter,
          parentId: this.featuresParentsList[this.selectedParent].id,
          type: this.selectedType == 4 ? CATEGORY_TYPE.list : this.selectedType,
          hasMultiple: this.selectedType == CATEGORY_TYPE.list,
        });

        this.featuresTree = temp;

        this.featureTitle = '';
        this.selectedType = 0;
        this.selectedParent = -1;
        this.featureDescription = '';
        this.isMain = false;
        this.showInFilter = false;
      } catch (error) {}
    } else {
      const feat: IProductCategoryProperty = {
        title: this.featureTitle,
        order: this.featuresParentsList.length,
        type: CATEGORY_TYPE.complex,
      };

      try {
        const res = await this.addNewCategoryService.addCategoryProperties(
          feat,
          this.categoryId,
        );

        const parentTemp = [...this.featuresParentsList];
        parentTemp.push({id: res.id, title: this.featureTitle});
        this.featuresParentsList = parentTemp;
        const temp = [...this.featuresTree];
        temp.push({
          id: res.id,
          title: this.featureTitle,
          type: CATEGORY_TYPE.complex,
          child: [],
        });
        this.featuresTree = temp;

        this.featureTitle = '';
        this.selectedType = 0;
        this.selectedParent = -1;
        this.featureDescription = '';
        this.isMain = false;
        this.showInFilter = false;
      } catch (error) {}
    }

    // this.new_features_when_updating.push(feature.id);
  };

  private removeFeature = (id) => {
    this.selectedParent = -1;

    let temp = [...this.featuresTree];
    temp.forEach((feat, i) => {
      if (feat.id == id) {
        temp.splice(i, 1);
        let parentTemp = [...this.featuresParentsList];
        parentTemp = parentTemp.filter((feature) => feature.id != id);
        this.featuresParentsList = parentTemp;
        return;
      }

      feat.child.forEach((child, cI) => {
        if (child.id == id) {
          feat.child.splice(cI, 1);
          return;
        }
      });
    });

    this.featuresTree = temp;
  };

  private sortFeature = (indexes: {old: number; new: number}) => {
    const tempFeature = [...this.featuresTree];
    const temp = tempFeature[indexes.old];
    tempFeature[indexes.old] = tempFeature[indexes.new];
    tempFeature[indexes.new] = temp;
    this.featuresTree = tempFeature;
  };

  private setUpdateCategoryFeature = async (id) => {
    this.setLoading(true);
    try {
      this.loadCategory();
      const categoryRes = await api.v1.productCategories.read(id);
      this.categoryTitle.value = categoryRes.data.name;
      this.selectedCategory = this.categories.findIndex(
        (category) => category.id == categoryRes.data.parent_id,
      );
      const propertiesRes = await api.v1.categoryProperties.read(id);
      // this.featuresParentsList = propertiesRes.data.filter(
      //   (feature) => feature.reference_id == null,
      // );
      this.featuresTree = rawFeatureToTree(propertiesRes.data);

      this.featureOptions = fetchOptions(this.featuresTree);
      this.mainFeatures = fetchMainFeature(propertiesRes.data);
      this.filterableFeatures = fetchFiltrableFeature(propertiesRes.data);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  @action handleActions = (target: Target, value?: any) => {
    switch (target) {
      case Target.SELECTED_CATEGORY:
        this.selectedCategory = value;
        break;

      case Target.CATEGORY_TITLE:
        var validationRES: ValidationRES = Validate(
          this.categoryTitle.validators,
          value,
        );
        const temp = {...this.categoryTitle};
        temp.value = value;
        temp.errorMessage = validationRES.message;
        this.categoryTitle = temp;
        break;
      case Target.CATEGORY_DESCRIPTION:
        this.categoryDescription = value;
        break;
      case Target.FEATURE_TITLE:
        this.featureTitle = value;
        break;

      case Target.SELECTED_TYPE:
        this.selectedType = value;
        break;
      case Target.SELECTED_PARENT:
        this.selectedParent = value;
        break;
      case Target.ADD_FEATURE:
        this.addFeature();
        break;
      case Target.REMOVE_FEATURE:
        this.deleted_features.push(value);
        this.removeFeature(value);
        break;
      case Target.EDIT_FEATURE:
        this.oldFeatureTitle = value.oldTitle;
        this.editingFeatureId = value.id;

        break;
      case Target.EDIT_FEATURE_TITLE:
        this.featuresTree = value;
        break;
      case Target.CANCEL_EDIT_FEATURE:
        this.featuresTree = value;
        this.oldFeatureTitle = '';
        this.editingFeatureId = -1;
        break;
      case Target.SAVE_EDIT_FEATURE:
        this.oldFeatureTitle = '';
        this.editingFeatureId = -1;
        break;
      case Target.FORM_LOAD:
        this.loadCategory();
        break;
      case Target.ON_TOGGLE_IS_MAIN:
        this.isMain = !this.isMain;
        break;
      case Target.ON_TOGGLE_SHOW_IN_FILTER:
        this.showInFilter = !this.showInFilter;
        break;
      case Target.ADD_CATEGORY:
        if (this.editing_category_id >= 0) {
          this.setPopUp(true, {
            message: 'آیا میخواهید دسته بندی را ویرایش کنید ؟',
            title: '',
            onClose: () => {
              this.setPopUp(false);
            },
            options: [
              {
                text: 'بله',
                action: () => this.updateCategory(),
                type: 'submit',
              },
              {text: 'خیر', action: () => this.setPopUp(false), type: 'cancel'},
            ],
          });
        } else {
          this.setPopUp(true, {
            message: 'آیا میخواهید دسته بندی را ایجاد کنید ؟',
            title: '',
            onClose: () => {
              this.setPopUp(false);
            },
            options: [
              {text: 'بله', action: () => this.addCategory(), type: 'submit'},
              {text: 'خیر', action: () => this.setPopUp(false), type: 'cancel'},
            ],
          });
          // this.addCategory();
        }
        break;
      case Target.ADD_FEATURE_OPTION:
        this.addFeatureOption();
        break;
      case Target.ON_CHANGE_FEATURE_OPTION_TITLE:
        this.featureOptionTitle = value;
        break;
      case Target.ON_SELECT_FEATURE_OPTION:
        if (this.selectedFeature == value) {
          this.selectedFeature = -1;
        } else {
          this.selectedFeature = value;
        }

        break;
      case Target.ON_SORT_FEATURE:
        this.sortFeature(value);
        break;
      case Target.REMOVE_OPTION:
        this.removeFeatureOption(value);

        break;
    }
  };

  private editing_category_id: number = -1;
  private deleted_features: number[] = [];
  private new_features_when_updating: number[] = [];

  private addCategoryFormReset = () => {
    this.featuresTree = [];
    this.categoryTitle = {...this.categoryTitle, value: '', errorMessage: null};
    this.categoryDescription = '';
    this.featureTitle = '';
    this.featureDescription = '';
    this.selectedFeature = -1;
    this.featureOptions = [];
    this.featureOptionTitle = '';
    this.selectedParent = -1;
    this.featuresParentsList = [];
    this.selectedCategory = -1;
    this.selectedType = -1;
    this.mainFeatures = [];
    this.filterableFeatures = [];
  };
}

export interface InjectedAddNewCategoryStore {
  addNewCategory: AddNewCategory;
}
