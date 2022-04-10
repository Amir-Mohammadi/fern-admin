import React from 'react';
import styles from '../../content-management.module.scss';

import AccordionList from '../../../../components/accordion-list';

import AddNewCategory, {
  AddNewCategoryProps,
} from '../../../../components/forms/add-new-category';
import AddNewProduct, {
  AddNewProductProps,
} from '../../../../components/forms/add-new-product';
import BrandsManagement, {
  BrandManagementProps,
} from '../../../../components/forms/brands-management';
import ProductsListDataSet, {
  ProductsListDataSetProps,
} from '../../../../components/dataset/products-list';
import CategoriesListDataSet, {
  CategoriesListDataSetProps,
} from '../../../../components/dataset/categories-list';


interface Props {
  addNewCategoryProps: AddNewCategoryProps;
  addNewProductProps: AddNewProductProps;
  brandsManagement: BrandManagementProps;
  productsListDataSetProps: ProductsListDataSetProps;
  categoriesListDataSetProps: CategoriesListDataSetProps;
  navigate: {
    currentScreen: number;
    goto: (target: number) => void;
  };
}

export enum NavigateTarget {
  ADD_NEW_PRODUCT_SCREEN,
  PRODUCTS_LIST_SCREEN,
  ADD_NEW_CATEGORY_SCREEN,
  CATEGORIES_LIST_SCREEN,
  BRANDS_MANAGEMENT,
}

export type ProductsProps = Props;

const Products: React.FC<ProductsProps> = (props) => {
  return (
    <div className={styles.magContainer}>
      <AccordionList
        data={[
          {
            title: 'ایجاد محصول جدید',
            content: <AddNewProduct {...props.addNewProductProps} />,
          },
          {
            title: 'لیست محصولات موجود',
            content: (
              <ProductsListDataSet {...props.productsListDataSetProps} />
            ),
          },
          {
            title: 'ایجاد دسته جدید',
            content: <AddNewCategory {...props.addNewCategoryProps} />,
          },
          {
            title: 'لیست دسته های موجود',
            content: (
              <CategoriesListDataSet {...props.categoriesListDataSetProps} />
            ),
          },
          {
            title: 'برند ها',
            content: <BrandsManagement {...props.brandsManagement} />,
          },
        ]}
        selectedIndex={props.navigate.currentScreen}
        onClick={(i) => {
          props.navigate.goto(i);
        }}
      />
    </div>
  );
};

export default Products;
