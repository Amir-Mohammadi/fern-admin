import api from '../../../../api';
import {IBrand} from '../../../../api/models';
import {brandRow} from '../../../../components/dataset/brands-list';
import {STATIC_FILE} from '../../../../utils/statics';

export default class BrandsManagementService {
  async addBrand(brand: IBrand) {
    try {
      return await api.v1.brand.create(brand);
    } catch (error) {
      throw error;
    }
  }

  async onDeleteBrand(id: number) {
    try {
      return await api.v1.brand.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async loadBrand(): Promise<Array<brandRow>> {
    try {
      const res = await api.v1.brand.getAllBrands();

      return this.brandListAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }

  private brandListAdapter(brands: Array<IBrand>): Array<brandRow> {
    const brandsList: Array<brandRow> = [];

    brands.forEach((brand) => {
      brandsList.push({
        id: brand.id,
        name: brand.name,
        browserTitle: brand.browser_title,
        imageAlt: brand.image_alt,
        imageTitle: brand.image_title,
        imageUrl: STATIC_FILE(brand.image_id, brand.row_version),
        description: brand.description,
        metaDescription: brand.meta_description,
        rowVersion: brand.row_version,
        urlTitle: brand.url_title,
      });
    });
    return brandsList;
  }
}
