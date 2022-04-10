
import AddNewCategory from '../content-management/customer/products/add-new-category';
import AddNewProduct from '../content-management/customer/products/add-new-product';
import BrandsManagement from '../content-management/customer/products/brands-management';
import CMPNavigate from '../content-management/customer/products/navigate';
import ProductsList from '../content-management/customer/products/products-list';
import CategoriesList from '../content-management/customer/products/categories-list';
import EleselMessage from '../customer-service-management/seller/elesel-message';
import OrderList from '../customer-service-management/seller/order-list';
import Manager from '../user-management/manager';
import Customer from '../user-management/customer';
import Seller from '../user-management/seller';
import Authenticate from '../authenticate';
import FileManagement from '../file-management';
import RevenueManagement from '../revenue-management';

export const loadStores = (force = false) => {
  const stores = {
    brandsManagement: new BrandsManagement(),
    addNewCategory: new AddNewCategory(),
    addNewProduct: new AddNewProduct(),
    productsList: new ProductsList(),
    categoriesList: new CategoriesList(),
    cmpNavigate: new CMPNavigate(),
    orderList: new OrderList(),
    eleselMessage: new EleselMessage(),
    manager: new Manager(),
    customer: new Customer(),
    seller: new Seller(),
    authenticate: new Authenticate(),
    fileManagement: new FileManagement(),
    revenueManagement: new RevenueManagement(),
  };

  if (force || (global && typeof global.__stores__ != 'object')) {
    global.__stores__ = stores;
  }
};
