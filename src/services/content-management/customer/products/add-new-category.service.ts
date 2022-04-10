import api from '../../../../api';
import {
  IProductCategory,
  IAddProductCategoryPropertyRes,
  IAddProductCategoryRes,
  IProductCategoryProperty,
} from '../../../../api/models';
import {featureToRequest} from '../../../../utils/adapter';

export default class AddNewCategoryService {
  async addNewCategory(
    category: IProductCategory,
  ): Promise<IAddProductCategoryRes> {
    try {
      const res = await api.v1.productCategories.create(category);

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async addCategoryProperties(
    property:IProductCategoryProperty,
    categoryId: number,
    // order: number,
    // isMain: boolean = false,
    // showInFilter: boolean = false,
  ): Promise<IAddProductCategoryPropertyRes> {
    // const propertyReq = featureToRequest(
    //   {...property, id: 0},
    //   isMain,
    //   showInFilter,
    //   order,
    // ); //need change
    try {
      const res = await api.v1.categoryProperties.create(
        property,
        categoryId,
      );
      return res.data;
    } catch (error) {}
  }
}
