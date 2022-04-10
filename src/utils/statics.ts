export const BASE_URL = 'http://127.0.0.1:5000';

export const STATIC_TEMP_FILE = `${BASE_URL}/document.ashx?fk=`;
export const STATIC_FILE = (id, rowVersion) =>
  `${BASE_URL}/document.ashx?id=${id}&rv=${rowVersion}`;

export const API = {
  V1: `${BASE_URL}/api/v1`,
};

export const ROUTES = {
  ADMIN: 'admin',
  BRANDS: 'brands',
  FILES: 'files',
  ORDERS: 'orders',
  PRODUCTS: 'products',
  PRODUCT_CATEGORIES: 'product-categories',
  USERS: 'users',
  COLORS: 'colors',
  PROVINCES:'provinces'
};
