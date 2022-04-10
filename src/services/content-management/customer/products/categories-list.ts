import api from '../../../../api';
import {IProductCategory} from '../../../../api/models';

export default class CategoriesListService {
  async loadCategories(): Promise<IProductCategory[]> {
    try {
      const res = await api.v1.productCategories.index();
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(category: IProductCategory): Promise<void> {
    try {
      const res = await api.v1.productCategories.update(category);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async removeCategory(categoryId: number): Promise<void> {
    try {
      const res = await api.v1.productCategories.delete(categoryId);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}
