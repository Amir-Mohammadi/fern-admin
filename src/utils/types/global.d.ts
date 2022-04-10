import {
  AddNewCategory,
  AddNewProduct,
  CMPNavigate,
} from './store';
declare global {
  namespace NodeJS {
    interface Global {
      __stores__: {
        addNewCategory: AddNewCategory;
        addNewProduct: AddNewProduct;
        cmpNavigate: CMPNavigate;
      };
    }
  }
}
