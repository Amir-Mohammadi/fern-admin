import api from '../../../../api';
import {
  IProductCategoryProperty,
  ICategoryPropertyRES,
} from '../../../../api/models';
import {FeatureType} from '../../../../components/forms/add-new-product';
import {
  featureToRequest,
  makeFeatureResponseTree,
} from '../../../../utils/adapter';
import {htmlWordToLink} from '../../../../utils/htmlLinksChanger';

export default class AddNewProductService {
  async loadFeatures(categoryId: number): Promise<Array<FeatureType>> {
    try {
      const res = await api.v1.categoryProperties.read(categoryId);

      return this.responseFeatureToTree(res.data);
    } catch (error) {
      throw error;
    }
  }

  async addNewOptionToFeatures(
    option: {value: string; parentId: number},
    categoryId,
  ): Promise<void> {
    const newOption = featureToRequest(
      {
        ...option,
        type: 1,
        title: option.value,
      },
      false,
      false,
      0,
    );
    try {
      const res = await api.v1.categoryProperties.create(newOption, categoryId);
    } catch (error) {
      throw error;
    }
  }

  async loadBrochure(productId: number): Promise<string> {
    try {
      const res = await api.v1.productBrochure.read(productId);

      return htmlWordToLink(res.data.html);
    } catch (error) {
      throw error;
    }
  }

  private responseFeatureToTree = (
    feature: Array<IProductCategoryProperty>,
  ): Array<FeatureType> => {
    const tree: Array<FeatureType> = makeFeatureResponseTree(feature);

    return tree;
  };
}
