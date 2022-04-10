import {action, observable} from 'mobx';

import {
  FeatureType,
  Target,
} from '../../../../components/forms/add-new-product';

import {
  categoryDropdownAdapter,
  productImageResponseToResult,
} from '../../../../utils/adapter';

import api from '../../../../api';

import {
  IBrand,
  IAddProduct,
  IAddProductProperty,
  IAddProductSize,
  IProductPropertyRES,
  IProductRes,
  IProductColorModel,
  IColorModel,
} from '../../../../api/models';

import {STATIC_FILE, STATIC_TEMP_FILE} from '../../../../utils/statics';
import {CATEGORY_TYPE} from '../../../../utils/types/enums';
import {PopUpProps} from '../../../../components/pop-up';

import {Target as OtherFeaturesTarget} from '../../../../components/forms/other-features';
import {Target as ProductSizeTarget} from '../../../../components/add-product-size';
import {Target as ProductColorTarget} from '../../../../components/add-product-color';
import {Target as ProductFeatureInputItemTarget} from '../../../../components/product-feature-input-item';

import {
  htmlLinksToWord,
  htmlWordToLink,
} from '../../../../utils/htmlLinksChanger';
import AddNewProductService from '../../../../services/content-management/customer/products/add-new-product.service';

export default class AddNewProduct {
  addNewProductService: AddNewProductService;

  constructor() {
    this.addNewProductService = new AddNewProductService();
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

  @observable.ref categories: {title: string; id?: number}[] = [];
  @observable pureCategories: {
    id?: number;
    name: string;
    parent_id: number | null;
    explanation: string | null;
    row_version?: string | null;
  }[] = [];

  @observable selectedCategory: number = -1;

  @observable productPriceFrom: number = 0;
  @observable productPriceTo: number = 0;
  @observable productDiscount: number = 0;
  @observable productBrochure: string = '';
  @observable productMetaDescription: string = '';
  @observable otherFeatures: string[] = [];
  @observable staticFeature: string = '';
  @observable productImages: {
    id: number;
    fileKey: string;
    url: string;
    title: string;
    alt: string;
    row_version: string | null;
  }[] = [];

  @observable selectedProductImage: number = 0;

  @observable tag: string = '';
  @observable productTags: {text: string; id?: number}[] = [];

  @observable.ref brandsDropdown: {title: string; id?: number}[] = [];
  @observable selectedBrand: number = -1;

  @observable brandsList: {
    id: number;
    name: string;
    logo: string;
    englishName: string;
  }[] = [];

  @observable.ref colorsDropdown: {title: string; id?: number}[] = [];
  @observable selectedColor: Array<number> = [];
  @observable colorsList: {
    id: number;
    name: string;
    code: number;
  }[] = [];

  @observable productTitle: string = '';
  @observable productUrlLink: string = '';
  @observable productBrowserTitle: string = '';

  @observable features: FeatureType[] = [];

  @observable productWeight: number = 0;
  @observable productWidth: number = 0;
  @observable productHeight: number = 0;
  @observable productLength: number = 0;

  @observable newColorName: string = '';
  @observable newColorCode: number = 0;
  @observable productColorList: {
    colorId: number;
    ColorName: string;
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

  private loadFeatures = async () => {
    try {
      const categoryId = this.categories[this.selectedCategory].id;

      this.features = await this.addNewProductService.loadFeatures(categoryId);
    } catch (error) {
      console.log(error);
    }
  };

  private loadBrochure = async () => {
    try {
      this.productBrochure = await this.addNewProductService.loadBrochure(
        this.editing_product_id,
      );
    } catch (error) {}
  };

  private addProduct = async () => {
    const product: IAddProduct = {
      id: 0,
      name: this.productTitle,
      url_title: this.productUrlLink,
      browser_title: this.productBrowserTitle,
      meta_description: this.productMetaDescription,
      category_id: this.categories[this.selectedCategory].id,
      brand_id: this.brandsList[this.selectedBrand].id,
      row_version: null,
    };

    try {
      this.setLoading(true, 'درحال ایجاد محصول');
      var res = await api.v1.product.create(product);
      const product_id = res.data.id;

      const productBrochure = await api.v1.productBrochure.create(
        {id: 0, html: htmlLinksToWord(this.productBrochure), row_version: null},
        product_id,
      );

      this.addProductSize(product_id);

      this.addProductColors(product_id);

      this.features.forEach((feature) => {
        if (feature.type == CATEGORY_TYPE.extra) {
          this.otherFeatures.forEach(async (value) => {
            const property: IAddProductProperty = {
              id: 0,
              product_category_property_id: feature.id,
              value: value,
              extra_key: null,
              row_version: null,
            };
            const FRes = await api.v1.productProperties.create(
              property,
              product_id,
            );
          });
        } else {
          feature.otherFeatures.values.forEach(async (value) => {
            const property: IAddProductProperty = {
              id: 0,
              product_category_property_id: feature.id,
              value: value.title,
              extra_key: feature.otherFeatures.labelText,
              row_version: null,
            };
            const FRes = await api.v1.productProperties.create(
              property,
              product_id,
            );
          });
          feature.items.forEach(async (item) => {
            if (
              item.type == CATEGORY_TYPE.list 
            ) {
              item.values?.forEach(async (value) => {
                const property: IAddProductProperty = {
                  id: 0,
                  product_category_property_id:
                    item.product_category_property_id,
                  value: item.options![value].id,
                  extra_key: null,
                  row_version: null,
                };
                const FRes = await api.v1.productProperties.create(
                  property,
                  product_id,
                );
              });
            } else {
              const property: IAddProductProperty = {
                id: 0,
                product_category_property_id: item.product_category_property_id,
                value: item.textValue!,
                extra_key: null,
                row_version: null,
              };
              const FRes = await api.v1.productProperties.create(
                property,
                product_id,
              );
            }
          });
        }
      });

      this.productTags.forEach(async (tag) => {
        const tag_response = await api.v1.productTags.create(tag, product_id);
      });

      this.productImages.forEach(async (image, i) => {
        const IRes = await api.v1.productImages.create(
          {
            id: 0,
            image_id: image.fileKey,
            order: i,
            image_alt: image.alt,
            image_title: image.title,
            row_version: image.row_version,
          },
          product_id,
        );

        if (i == this.selectedProductImage) {
          const previewImageRes = await api.v1.productImages.preview(
            IRes.data.id,
            product_id,
          );
        }
      });

      this.setPopUp(true, {
        title: 'ثبت شد',
        message: `محصول ${this.productTitle} با موفقیت ثبت شد.`,
        onClose: () => {
          this.setPopUp(false);
          this.addProductFormReset();
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

  private doUpdateOnOtherFeatures = () => {
    try {
      this.removed_product_other_feature_id.forEach(async (featureId) => {
        const FRes = await api.v1.productProperties.delete(
          this.editing_product_id,
          featureId,
        );
      });
      this.features.forEach((feature) => {
        if (feature.type != CATEGORY_TYPE.extra) {
          feature.otherFeatures.values.forEach(async (value) => {
            const property: IAddProductProperty = {
              id: value.id,
              product_category_property_id: feature.id,
              value: value.title,
              extra_key: feature.otherFeatures.labelText,
              row_version: value.row_version,
            };

            if (value.id >= 0) {
              const FRes = await api.v1.productProperties.update(
                property,
                this.editing_product_id,
                value.id,
              );
            } else {
              const FRes = await api.v1.productProperties.create(
                property,
                this.editing_product_id,
              );
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  private doUpdateOnFeature = () => {
    this.features.forEach(async (feature) => {
      if (feature.type != CATEGORY_TYPE.extra) {
        feature.items.forEach(async (item) => {
          if (
            item.type == CATEGORY_TYPE.list
          ) {
          } else {
            const property: IAddProductProperty = {
              id: item.id,
              product_category_property_id: item.product_category_property_id,
              value: item.textValue!,
              extra_key: null,
              row_version: item.row_version,
            };
            const FRes = await api.v1.productProperties.update(
              property,
              this.editing_product_id,
              item.id,
            );
          }
        });
      }
    });
  };

  private doUpdateOnTags = () => {
    try {
      this.removed_product_tag_id.forEach(async (tagId) => {
        const FRes = await api.v1.productTags.delete(
          this.editing_product_id,
          tagId,
        );
      });
      this.productTags.forEach(async (tag) => {
        if (tag.id == -1) {
          const tag_response = await api.v1.productTags.create(
            tag,
            this.editing_product_id,
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  private doUpdateOnImages = () => {
    try {
      this.removed_product_image_id.forEach(async (imageId) => {
        const imageRes = await api.v1.productImages.delete(
          this.editing_product_id,
          imageId,
        );
      });

      this.productImages.forEach(async (image, i) => {
        if (image.id == -1) {
          const imageRes = await api.v1.productImages.create(
            {
              id: 0,
              image_id: image.fileKey,
              order: i,
              image_alt: image.alt,
              image_title: image.title,
              row_version: image.row_version,
            },
            this.editing_product_id,
          );

          // if (i == this.selectedProductImage) {
          //   const previewImageRes = await api.v1.productImages.preview(
          //     imageRes.data.id,
          //     this.editing_product_id,
          //   );
          // }
        } else {
          const imageRes = await api.v1.productImages.patch(
            {
              image_alt: image.alt,
              image_title: image.title,
              row_version: image.row_version,
            },
            this.editing_product_id,
            image.id,
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  private updateProduct = async () => {
    const product: IAddProduct = {
      id: this.editing_product_id,
      name: this.productTitle,
      url_title: this.productUrlLink,
      browser_title: this.productBrowserTitle,
      meta_description: this.productMetaDescription,
      category_id: this.categories[this.selectedCategory].id,
      brand_id: this.brandsList[this.selectedBrand].id,
      row_version: this.editing_product_row_version,
    };

    try {
      this.setLoading(true, 'درحال ایجاد محصول');
      var res = await api.v1.product.update(product, this.editing_product_id);
      const product_id = res.data.id;

      await this.doUpdateOnOtherFeatures();
      await this.doUpdateOnFeature();
      await this.doUpdateOnTags();
      await this.doUpdateOnImages();

      this.setPopUp(true, {
        title: 'ویرایش شد',
        message: `محصول ${this.productTitle} با موفقیت ویرایش شد.`,
        onClose: () => {
          this.setPopUp(false);
          this.addProductFormReset();
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

  private selectProductImages = async (files: FileList) => {
    if (files && files[0]) {
      const files_array = Array.from(files);
      files_array.forEach(async (file) => {
        const data = new FormData();
        data.append('files', file);

        try {
          const res = await api.v1.fileUpload.upload(data);
          const temp = [...this.productImages];
          temp.push({
            id: -1,
            fileKey: res.data[0],
            url: `${STATIC_TEMP_FILE}${res.data[0]}`,
            title: '',
            alt: '',
            row_version: null,
          });
          this.productImages = temp;
        } catch (error) {
          console.log(error);
        }
      });
    }
  };

  private replaceBackupData = (files: FileList) => {
    if (files && files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsText(files[0], 'UTF-8');
      fileReader.onload = ({target}) => {
        const backupData = JSON.parse(target.result.toString());

        this.selectedCategory = backupData.selectedCategory;
        this.productBrochure = backupData.productBrochure;
        this.productMetaDescription = backupData.productMetaDescription;
        this.otherFeatures = backupData.otherFeatures;
        this.staticFeature = backupData.staticFeature;
        this.productImages = backupData.productImages;
        this.selectedProductImage = backupData.selectedProductImage;
        this.productTags = backupData.productTags;
        this.selectedBrand =
          backupData.selectedBrand == -1
            ? backupData.selectedBrand
            : this.brandsDropdown.findIndex(
                (brand) => brand.id == backupData.selectedBrand,
              );
        this.productTitle = backupData.productTitle;
        this.productUrlLink = backupData.productUrlLink;
        this.productBrowserTitle = backupData.productBrowserTitle;
        this.features = backupData.features;
      };
    }
  };

  private removeProductImage = (index: number) => {
    const temp = [...this.productImages];
    if (this.editing_product_id >= 0 && temp[index].id >= 0) {
      this.removed_product_image_id.push(temp[index].id);
    }

    temp.splice(index, 1);
    this.selectedProductImage = 0;
    this.productImages = temp;
  };

  private loadColor = async () => {
    try {
      const res = await api.v1.color.getAllColors();
      const colors: IColorModel[] = res.data;

      this.colorsList = colors.map((color) => {
        return {
          id: color.id,
          name: color.name,
          code: color.code,
        };
      });

      this.colorsDropdown = colors.map((color) => ({
        title: `${color.name} `,
        id: color.id,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  private addNewColor = async () => {
    await api.v1.color.create({
      name: this.newColorName,
      code: this.newColorCode,
    });

    this.loadColor();
    alert('new color added');
  };

  private loadBrand = async () => {
    try {
      const res = await api.v1.brand.getAllBrands();
      const brands: IBrand[] = res.data;
      this.brandsList = brands.map((brand) => {
        return {
          id: brand.id,
          name: brand.name,
          englishName: brand.browser_title,

          logo: STATIC_FILE(brand.image_id, brand.row_version),
        };
      });

      this.brandsDropdown = brands.map((brand) => ({
        title: `${brand.name} `,
        id: brand.id,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  private setValuesForUpdate = async (response: IProductRes) => {
    this.productTitle = response.name;
    this.productUrlLink = response.url_title;
    this.productBrowserTitle = response.browser_title;
    this.productMetaDescription = response.meta_description || '';
    this.editing_product_row_version = response.row_version;
    this.selectedBrand = this.brandsDropdown.findIndex((brand) => {
      return brand.id == response.brand_id;
    });
    this.selectedCategory = this.categories.findIndex((category) => {
      return category.id == response.category_id;
    });
    await this.loadFeatures();
    await this.loadBrochure();
  };

  private setUpdateProductProperties = async (id) => {
    this.setLoading(true);
    try {
      await this.loadBrand();
      await this.loadCategory();
      await this.loadColor();

      const productRes = await api.v1.product.read(id);
      await this.setValuesForUpdate(productRes.data);

      const productPropertyRes = await api.v1.productProperties.index(id);
      await this.fillFeaturesValue(productPropertyRes.data);

      const productTagsRes = await api.v1.productTags.index(id);
      this.productTags = productTagsRes.data;

      const productImagesRes = await api.v1.productImages.index(id);
      this.productImages = await productImageResponseToResult(
        productImagesRes.data,
      );

      this.setLoading(false);
    } catch (error) {
      this.setPopUp(true, {
        message: 'بارگیری اطلاعات محصول امکان پذیر نمی باشد.',
        title: 'عملیات ناموفق',
        onClose: () => {
          this.setPopUp(false);
          this.addProductFormReset();
        },
        options: [
          {
            action: () => {
              this.setPopUp(false);
              this.setUpdateProductProperties(this.editing_product_id);
            },
            text: 'تلاش دوباره',
            type: 'submit',
          },
        ],
      });
    } finally {
    }
  };

  private addOtherFeature = () => {
    const temp = [...this.otherFeatures];
    temp.push(this.staticFeature);
    this.otherFeatures = temp;
    this.staticFeature = '';
  };

  private removeOtherFeature = (i) => {
    const temp = [...this.otherFeatures];
    temp.splice(i, 1);
    this.otherFeatures = temp;
  };

  private loadCategory = async () => {
    this.setLoading(true, 'درحال بارگیری لیست دسته بندی ها');
    try {
      var res = await api.v1.productCategories.index();
      this.pureCategories = res.data;
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

  private addTag = () => {
    const temp = [...this.productTags];
    temp.push({text: this.tag, id: -1});
    this.tag = '';
    this.productTags = temp;
  };

  private addProductSize = async (productId: number) => {
    const addProductSize: IAddProductSize = {
      length: this.productLength,
      height: this.productHeight,
      width: this.productWidth,
      weight: this.productWeight,
      row_version: null,
    };

    await api.v1.productSize.create(addProductSize, productId);
  };

  private addProductColors = async (productId: number) => {
    this.productColorList.forEach(async (item) => {
      const addProductColor: IProductColorModel = {
        color_id: item.colorId,
      };
      await api.v1.productColor.addProductColor(addProductColor, productId);
    });
  };

  private removeTag = (index) => {
    const temp = [...this.productTags];
    if (this.editing_product_id >= 0) {
      this.removed_product_tag_id.push(this.productTags[index].id!);
    }
    temp.splice(index, 1);
    this.productTags = temp;
  };

  private removeColor = (index) => {
    const temp = [...this.productColorList];
    temp.splice(index, 1);
    this.productColorList = temp;
  };
  private onUpdateSelectedColors = (index: number) => {
    const is_exist: boolean = this.selectedColor.includes(index);
    if (is_exist) {
      this.selectedColor = this.selectedColor.filter((i) => i !== index);
      this.productColorList = this.productColorList.filter(
        (color) => color.colorId !== this.colorsList[index].id,
      );
    } else {
      const tempSelectedColors = [...this.selectedColor];
      tempSelectedColors.push(index);
      this.selectedColor = tempSelectedColors;

      const tempProductColorList = [...this.productColorList];
      tempProductColorList.push({
        colorId: this.colorsList[index].id,
        ColorName: this.colorsList[index].name,
      });
      this.productColorList = tempProductColorList;
    }
  };

  private addNewValueToValues = async (option) => {
    const categoryId = this.categories[this.selectedCategory].id;
    try {
      const res = await this.addNewProductService.addNewOptionToFeatures(
        option,
        categoryId,
      );

      this.loadFeatures();
    } catch (error) {
      this.setPopUp(true, {
        message: error,
        title: 'عملیات ناموفق',
        onClose: () => {
          this.setPopUp(false);
        },
      });
    } finally {
    }
  };

  @action handleActions = (
    target:
      | Target
      | OtherFeaturesTarget
      | ProductSizeTarget
      | ProductColorTarget
      | ProductFeatureInputItemTarget,
    value?: any,
  ) => {
    switch (target) {
      case Target.SELECTED_CATEGORY:
        this.selectedCategory = value;
        break;
      case Target.PRODUCT_TAG:
        this.tag = value;
        break;
      case Target.ADD_PRODUCT_TAG:
        this.addTag();
        break;
      case ProductSizeTarget.PRODUCT_HEIGHT:
        this.productHeight = value;
        break;
      case ProductSizeTarget.PRODUCT_WIDTH:
        this.productWidth = value;
        break;
      case ProductSizeTarget.PRODUCT_LENGTH:
        this.productLength = value;
        break;
      case ProductSizeTarget.PRODUCT_WEIGHT:
        this.productWeight = value;
        break;
      case Target.REMOVE_PRODUCT_TAG:
        this.removeTag(value);
        break;
      case Target.PRODUCT_TITLE:
        this.productTitle = value;
        break;
      case Target.PRODUCT_URL_LINK:
        this.productUrlLink = value;
        break;
      case Target.PRODUCT_BROWSER_TITLE:
        this.productBrowserTitle = value;
        break;
      case Target.PRODUCT_META_DESCRIPTION:
        this.productMetaDescription = value;
        break;
      case Target.LOAD_FEATURES:
        this.loadFeatures();
        break;
      case ProductFeatureInputItemTarget.ON_CHANGE:
        this.features = value;
        break;
      case ProductFeatureInputItemTarget.ADD_NEW_VALUE:
        this.addNewValueToValues(value);
        break;
      case Target.PRODUCT_DISCOUNT:
        this.productDiscount = value;
        break;
      case Target.FORM_LOAD:
        this.loadBrand();
        this.loadCategory();
        this.loadColor();

        break;
      case Target.SELECTED_BRAND:
        this.selectedBrand = value;
        break;
      case Target.ADD_PRODUCT:
        if (this.editing_product_id >= 0) {
          this.updateProduct();
        } else {
          this.addProduct();
        }
        break;
      case Target.PRODUCT_DESCRIPTION:
        this.productBrochure = value;
        break;
      case Target.ADD_STATIC_FEATURE:
        this.addOtherFeature();
        break;
      case Target.REMOVE_OTHER_FEATURE:
        this.removeOtherFeature(value);
        break;
      case Target.STATIC_FEATURE:
        this.staticFeature = value;
        break;
      case Target.ADD_IMAGES:
        this.selectProductImages(value);
        break;

      case Target.SELECTED_IMAGE:
        this.selectedProductImage = value;
        break;
      case Target.REMOVE_IMAGE:
        this.removeProductImage(value);
        break;
      case Target.ON_CHANGE_HAS_EXTRA:
        const temp = [...this.features];
        temp[value].hasExtra = !temp[value].hasExtra;
        this.features = temp;
        break;
      case Target.ON_CHANGE_IMAGE_TITLE:
        this.productImages = [...this.productImages];
        break;
      case Target.ON_CHANGE_IMAGE_ALT:
        this.productImages = [...this.productImages];
        break;
      case Target.SET_EDIT_VALUES:
        this.editing_product_id = value;
        this.setUpdateProductProperties(value);

        break;
      case Target.IMPORT_BACKUP:
        this.replaceBackupData(value);

        break;
      case OtherFeaturesTarget.ON_LABEL_CHANGE:
        this.features = [...this.features];
        break;
      case OtherFeaturesTarget.ON_VALUE_CHANGE:
        this.features = [...this.features];
        break;
      case OtherFeaturesTarget.ON_ADD_VALUE:
        this.features = [...this.features];

        break;
      case OtherFeaturesTarget.ON_REMOVE_VALUE:
        this.features = [...this.features];
        this.removed_product_other_feature_id.push(value);
        break;

      case ProductColorTarget.NEW_COLOR_NAME:
        this.newColorName = value;
        break;
      case ProductColorTarget.NEW_COLOR_CODE:
        this.newColorCode = value;
        break;
      case ProductColorTarget.ADD_NEW_COLOR:
        this.addNewColor();
        break;

      case ProductColorTarget.SELECTED_COLOR:
        this.onUpdateSelectedColors(value);
        break;
      case ProductColorTarget.ADD_COLOR_TO_LIST:
        break;

      case ProductColorTarget.REMOVE_PRODUCT_Color:
        this.removeColor(value);
        break;

      default:
        break;
    }
  };

  @action createBackup = () => {
    const backup = {
      selectedCategory: this.selectedCategory,
      productBrochure: this.productBrochure,
      productMetaDescription: this.productMetaDescription,
      otherFeatures: this.otherFeatures,
      staticFeature: this.staticFeature,
      productImages: this.productImages,
      selectedProductImage: this.selectedProductImage,
      productTags: this.productTags,
      selectedBrand:
        this.selectedBrand == -1
          ? this.selectedBrand
          : this.brandsDropdown[this.selectedBrand].id,
      productTitle: this.productTitle,
      productUrlLink: this.productUrlLink,
      productBrowserTitle: this.productBrowserTitle,
      features: this.features,
    };

    return backup;
  };

  private editing_product_id: number = -1;
  private editing_product_row_version: string = '';
  private removed_product_tag_id: number[] = [];
  private removed_product_other_feature_id: number[] = [];
  private removed_product_image_id: number[] = [];

  private fillFeaturesValue = (values: IProductPropertyRES[]) => {
    this.features.forEach((feature, i) => {
      if (feature.type == 5) {
      } else {
        values.forEach((value) => {
          var itemsTemp = feature.items;
          itemsTemp.forEach((item) => {
            if (
              value.product_category_property_id ==
              item.product_category_property_id
            ) {
              item.id = value.id;
              item.row_version = value.row_version;
              if (
                value.product_category_property.type == 1 ||
                value.product_category_property.type == 2
              ) {
                item.textValue = value.value;
              }

              if (
                value.product_category_property.type == 3 ||
                value.product_category_property.type == 4
              ) {
                const itemValue = item.options!.findIndex((category) => {
                  return category.id == +value.value;
                });

                item.values?.push(itemValue);
              }
            }
          });
          feature.items = [...itemsTemp];
          if (value.product_category_property_id == feature.id) {
            if (value.extra_key) {
              feature.hasExtra = true;
              feature.otherFeatures.labelText = value.extra_key;
              feature.otherFeatures.values.push({
                id: value.id,
                title: value.value,
                row_version: value.row_version,
              });
            }
          }
        });
      }
      if (i == this.features.length - 1) {
        this.features = [...this.features];
      }
    });
  };

  private addProductFormReset = () => {
    this.productTitle = '';
    this.productUrlLink = '';
    this.productMetaDescription = '';
    this.productBrowserTitle = '';
    this.selectedCategory = -1;
    this.features = [];
    this.productPriceFrom = 0;
    this.productPriceTo = 0;
    this.productDiscount = 0;
    this.productBrochure = '';
    this.selectedBrand = -1;
    this.otherFeatures = [];
    this.staticFeature = '';
    this.productImages = [];
    this.selectedProductImage = 0;
    this.editing_product_id = -1;
    this.productLength = 0;
    this.productHeight = 0;
    this.productWidth = 0;
    this.productWeight = 0;
    this.productColorList = [];
    this.selectedColor = [];
  };
}

export interface InjectedAddNewProductStore {
  addNewProduct: AddNewProduct;
}
