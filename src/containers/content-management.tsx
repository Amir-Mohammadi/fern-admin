import React, {Component} from 'react';

import {inject, observer} from 'mobx-react';
import {
  InjectedCMPNavigateStore,
  InjectedProductsListStore,
  InjectedAddNewProductStore,
  InjectedAddNewCategoryStore,
  InjectedCategoriesListStore,
  InjectedBrandsManagementStore,
} from '../stores';

import ContentManagementScreen from '../screens/content-management';
import {ActionType} from '../components/icons';

export type ContentManagementContainerProps = InjectedBrandsManagementStore &
  InjectedAddNewCategoryStore &
  InjectedCategoriesListStore &
  InjectedAddNewProductStore &
  InjectedProductsListStore &
  InjectedCMPNavigateStore;

@inject('productsList')
@inject('cmpNavigate')
@inject('addNewProduct')
@inject('categoriesList')
@inject('addNewCategory')
@inject('brandsManagement')
@observer
class ContentManagement extends Component<ContentManagementContainerProps> {
  render() {
    return (
      <ContentManagementScreen
        addNewCategoryProps={{
          categoryId: this.props.addNewCategory.categoryId,
          isMain: this.props.addNewCategory.isMain,
          showInFilter: this.props.addNewCategory.showInFilter,
          popUp: this.props.addNewCategory.popUp,
          loading: this.props.addNewCategory.loading,
          editingFeatureId: this.props.addNewCategory.editingFeatureId,
          oldFeatureTitle: this.props.addNewCategory.oldFeatureTitle,
          featuresTree: this.props.addNewCategory.featuresTree,
          categoryTitle: this.props.addNewCategory.categoryTitle,
          categoryDescription: this.props.addNewCategory.categoryDescription,
          featureTitle: this.props.addNewCategory.featureTitle,
          featureDescription: this.props.addNewCategory.featureDescription,
          featureType: this.props.addNewCategory.featureType,
          selectedFeature: this.props.addNewCategory.selectedFeature,
          featureOptions: this.props.addNewCategory.featureOptions,
          featureOptionTitle: this.props.addNewCategory.featureOptionTitle,
          selectedParent: this.props.addNewCategory.selectedParent,
          featuresParentList: this.props.addNewCategory.featuresParentsList,
          categories: this.props.addNewCategory.categories,
          selectedCategory: this.props.addNewCategory.selectedCategory,
          selectedType: this.props.addNewCategory.selectedType,
          mainFeatures: this.props.addNewCategory.mainFeatures,
          filtrableFeatures: this.props.addNewCategory.filterableFeatures,
          action: (target, value) => {
            this.props.addNewCategory.handleActions(target, value);
          },
        }}
        addNewProductProps={{
          popUp: this.props.addNewProduct.popUp,
          loading: this.props.addNewProduct.loading,
          productTitle: this.props.addNewProduct.productTitle,
          productMetaDescription:
            this.props.addNewProduct.productMetaDescription,
          tag: this.props.addNewProduct.tag,
          productTags: this.props.addNewProduct.productTags,
          productUrlLink: this.props.addNewProduct.productUrlLink,
          productBrowserTitle: this.props.addNewProduct.productBrowserTitle,
          categories: this.props.addNewProduct.categories,
          selectedCategory: this.props.addNewProduct.selectedCategory,
          features: this.props.addNewProduct.features,
          productPriceFrom: this.props.addNewProduct.productPriceFrom,
          productPriceTo: this.props.addNewProduct.productPriceTo,
          productDiscount: this.props.addNewProduct.productDiscount,
          brands: this.props.addNewProduct.brandsDropdown,
          productDescription: this.props.addNewProduct.productBrochure,
          selectedBrand: this.props.addNewProduct.selectedBrand,
          otherFeatures: this.props.addNewProduct.otherFeatures,
          staticFeature: this.props.addNewProduct.staticFeature,
          images: this.props.addNewProduct.productImages,
          selectedImage: this.props.addNewProduct.selectedProductImage,
          createBackup: this.props.addNewProduct.createBackup,

          productSize: {
            productHeight: this.props.addNewProduct.productHeight,
            productWeight: this.props.addNewProduct.productWeight,
            productLength: this.props.addNewProduct.productLength,
            productWidth: this.props.addNewProduct.productWidth,
          },

          productColor: {
            newColorName: this.props.addNewProduct.newColorName,
            newColorCode: this.props.addNewProduct.newColorCode,
            colors: this.props.addNewProduct.colorsDropdown,
            selectedColor: this.props.addNewProduct.selectedColor,
            productListColor: this.props.addNewProduct.productColorList,
          },

          action: (target, value) => {
            this.props.addNewProduct.handleActions(target, value);
          },
        }}
        brandsManagement={{
          ...this.props.brandsManagement,
          name: this.props.brandsManagement.name,
          brandImageUrl: this.props.brandsManagement.brandImageUrl,
          brands: {
            brandEditingRow: this.props.brandsManagement.brandEditingRow,
            table: {
              ...this.props.brandsManagement,
              actions: [
                {type: ActionType.Archive},
                {type: ActionType.Delete},
                {type: ActionType.Edit},
                {type: ActionType.Release},
              ],
            },
          },
          action: (target, value) => {
            this.props.brandsManagement.handleActions(target, value);
          },
        }}
        productsListDataSetProps={{
          popUp: this.props.productsList.popUp,
          loading: this.props.productsList.loading,
          editingRow: this.props.productsList.productEditingRow,
          categories: this.props.productsList.categories,
          searchBar: {
            visible: this.props.productsList.productListSearchBarIsVisible,
            placeHolder:
              this.props.productsList.productListSearchBarPlaceHolder,
            value: this.props.productsList.productListSearchInput,
          },
          table: {
            headers: this.props.productsList.productListHeaders,
            rows: this.props.productsList.productListRows,
            actions: [
              {type: ActionType.Archive},
              {type: ActionType.Delete},
              {type: ActionType.Edit},
              {type: ActionType.Release},
            ],
          },
          action: (target, value) => {
            this.props.productsList.handleActions(target, value);
          },
        }}
        categoriesListDataSetProps={{
          popUp: this.props.categoriesList.popUp,
          loading: this.props.categoriesList.loading,
          categories: this.props.categoriesList.categories,
          editingRow: this.props.categoriesList.categoryEditingRow,
          table: {
            headers: this.props.categoriesList.categoryListHeaders,
            rows: this.props.categoriesList.pureCategories,
            actions: [
              {type: ActionType.Archive},
              {type: ActionType.Delete},
              {type: ActionType.Edit},
              {type: ActionType.Release},
            ],
          },
          action: (target, value) => {
            this.props.categoriesList.handleActions(target, value);
          },
        }}
        navigate={{
          currentScreen: this.props.cmpNavigate.currentScreen,
          goto: (i) => this.props.cmpNavigate.goto(i),
        }}
      />
    );
  }
}

export default ContentManagement as any;
