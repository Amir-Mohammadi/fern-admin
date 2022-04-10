import api from '../../api';
import {
  ICities,
  IColorGet,
  IProductPriceSet,
  IProductRes,
  IProvince,
} from '../../api/models';
import {ListItem} from '../../components/list-accordion';
import {
  CitiesList,
  ColorsList,
  ProvincesList,
} from '../../components/price-range';

export default class RevenueManagementService {
  async createProductPrice(price: IProductPriceSet, productId: number) {
    try {
      return await api.v1.productPrice.create(price, productId);
    } catch (error) {
      throw error;
    }
  }

  async loadProductsList(): Promise<ListItem[]> {
    try {
      const res = await api.v1.product.index();
      return this.productListAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }

  async loadProvincesList(): Promise<ProvincesList[]> {
    try {
      const res = await api.v1.province.getProvinces();
      return this.provincesListAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }

  async loadCitiesList(provinceId): Promise<CitiesList[]> {
    try {
      const res = await api.v1.province.getCities(provinceId);
      return this.citiesListAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }

  async loadProductColor(productId: number): Promise<Array<ColorsList>> {
    try {
      const res = await api.v1.productColor.getProductColors(productId);
      return this.colorsListAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }

  private productListAdapter(products: Array<IProductRes>): Array<ListItem> {
    const productList: Array<ListItem> = [];

    products.forEach((product) => {
      productList.push({title: product.name, id: product.id});
    });

    return productList;
  }

  private provincesListAdapter(
    provincesList: Array<IProvince>,
  ): Array<ProvincesList> {
    const provinces: Array<ProvincesList> = [];
    provincesList.forEach((province) => {
      provinces.push({
        id: province.id,
        areaCode: province.area_code,
        title: province.name,
      });
    });

    return provinces;
  }
  private citiesListAdapter(citiesList: Array<ICities>): Array<CitiesList> {
    const cities: Array<CitiesList> = [];
    citiesList.forEach((city) => {
      cities.push({
        id: city.id,
        title: city.name,
      });
    });

    return cities;
  }

  private colorsListAdapter(colorsList: Array<IColorGet>): Array<ColorsList> {
    const colors: Array<ColorsList> = [];

    colorsList.forEach((color) => {
      colors.push({
        id: color.color_id,
        title: color.color.name,
      });
    });

    return colors;
  }
}
