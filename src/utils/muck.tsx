import {Row as OrderRows} from '../components/dataset/customer-order-list';
import {RowProductMessage} from '../components/dataset/product-request-message';
import {ActionType, IconTypes} from '../components/icons';
import {Row as OrderItemRows} from '../components/order-item-list';
import {Order, Payment, Post} from './types/enums';
import {
  faColumns,
  faUserCog,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import {
  faMoneyBillAlt,
  faClipboard,
  faChartBar,
  faFolderOpen,
} from '@fortawesome/free-regular-svg-icons';
import {Rows as dataSetRows} from '../components/dataset';
import {Item, UserInfo} from '../components/side-bar';

export const SIDE_BAR: {userInfo: UserInfo; items: Item[]} = {
  userInfo: {name: 'صنایع صبح پارلار', email: 'Parlar@info.ir'},
  items: [
    {text: 'داشبورد', icon: faColumns, path: '/dashboard'},
    {
      text: 'مدیریت درآمد',
      icon: faMoneyBillAlt,
      path: '/revenue-management',
    },
    {
      text: 'مدیریت کاربران',
      icon: faUserCog,
      path: '/user-management',
    },
    {
      text: 'مدیریت محتوا',
      icon: faClipboard,
      path: '/content-management',
    },
    {
      text: 'مدیریت امور مشتریان',
      icon: faUserTie,
      path: '/customer-services-management',
    },
    {text: 'آمارها', icon: faChartBar, path: '/statistics'},
    {text: 'مدیریت فایل', icon: faFolderOpen, path: '/file-management'},
  ],
};

export const ROUTES = [
  '/dashboard',
  '/revenue-management',
  '/user-management',
  '/content-management',
  '/customer-services-management',
  '/statistics',
];

export const CHART_DATA = [1800, 500, 800, 500, 200, 500, 500];

export const DATA_SET_HEADER_SEARCHBAR = {
  visible: false,
  placeHolder: 'جستجو کن...',
  value: '',
};

export const DATA_SET_TABLE_ROW: dataSetRows[][] = [
  [
    {text: 'کاربر شماره 1', editable: true},
    {text: 'نمونه 1', editable: true},
    {text: 'info@googlemail.com', editable: true},
    {text: '1399/09/09-22:30'},
  ],
  [
    {text: 'کاربر شماره 1', editable: true},
    {text: 'نمونه 1', editable: true},
    {text: 'info@googlemail.com', editable: true},
    {text: '1399/09/09-22:30'},
  ],
  [
    {text: 'کاربر شماره 1', editable: true},
    {text: 'نمونه 1', editable: true},
    {text: 'info@googlemail.com', editable: true},
    {text: '1399/09/09-22:30'},
  ],
  [
    {text: 'کاربر شماره 1', editable: true},
    {text: 'نمونه 1', editable: true},
    {text: 'info@googlemail.com', editable: true},
    {text: '1399/09/09-22:30'},
  ],
  [
    {text: 'کاربر شماره 1', editable: true},
    {text: 'نمونه 1', editable: true},
    {text: 'info@googlemail.com', editable: true},
    {text: '1399/09/09-22:30'},
  ],
  [
    {text: 'کاربر شماره 1', editable: true},
    {text: 'نمونه 1', editable: true},
    {text: 'info@googlemail.com', editable: true},
    {text: '1399/09/09-22:30'},
  ],
  [
    {text: 'کاربر شماره 1', editable: true},
    {text: 'نمونه 1', editable: true},
    {text: 'info@googlemail.com', editable: true},
    {text: '1399/09/09-22:30'},
  ],
  [
    {text: 'کاربر شماره 1', editable: true},
    {text: 'نمونه 1', editable: true},
    {text: 'info@googlemail.com', editable: true},
    {text: '1399/09/09-22:30'},
  ],
  [
    {text: 'کاربر شماره 1', editable: true},
    {text: 'نمونه 1', editable: true},
    {text: 'info@googlemail.com', editable: true},
    {text: '1399/09/09-22:30'},
  ],
  [
    {text: 'کاربر شماره 1', editable: true},
    {text: 'نمونه 1', editable: true},
    {text: 'info@googlemail.com', editable: true},
    {text: '1399/09/09-22:30'},
  ],
  [
    {text: 'کاربر شماره 1', editable: true},
    {text: 'نمونه 1', editable: true},
    {text: 'info@googlemail.com', editable: true},
    {text: '1399/09/09-22:30'},
  ],
];

export const DATA_SET_TABLE_ACTION = [
  {type: ActionType.Edit, title: 'ویرایش'},
  {type: ActionType.Delete, title: 'حذف'},
  {type: ActionType.Archive, title: 'بایگانی'},
  {type: ActionType.Release, title: 'انتشار'},
];

export const DATA_SET_TABLE_EDITOR = [
  {text: '', editable: true},
  {text: '', editable: true},
  {text: '', editable: true},
  {text: '', editable: true},
];

export const USER_MANAGEMENT = {
  onChange: () => {},
  onSubmit: () => {},
  username: '',
  email: '',
  type: 0,
  userType: [{title: '1'}],
};

export const ADD_PRODUCT = {
  title: 'ثبت فروشنده جدید جدید',
  onClick: () => {},
};

export const SELLER_INFO = {
  onclick: () => {},
  name: 'test',
  username: 'test',
  Personality: 0,
  gender: 1,
  birthDate: '00/00/01',
  naturalCode: '0000',
  naturalNumber: '00000',
  password: '000000',
  onChange: () => {},
};

export const SELLER_ADDRESS = {
  states: [{title: 'state1'}, {title: 'state2'}],
  cities: [{title: 'city1'}, {title: 'city2'}],
  selectedState: 1,
  selectedCity: 0,
  postalCode: '000000',
  mobile: '099999999',
  street: '123',
  tel: '000000012',
  alley: '1234',
  email: 'test@gmail.com',
  plaque: '222',
  website: 'test.com',
  onChange: () => {},
};

export const CONTRACT_INFO = {
  contractCode: '0',
  contractPath: '0',
  createDate: '0',
  finishDate: '0',
  onChange: () => {},
  onclick: () => {},
};

export const CUSTOMER_ORDER: Array<OrderRows> = [
  {
    id: 1,
    customerName: 'امیر دلاور',
    customerEmail: 'amir.delavar@outlook.com',
    totalPrice: 1000000,
    createdAt: '1399/12/29',
    rowVersion: null,
  },
  {
    id: 2,
    customerName: 'امیر دلاور',
    customerEmail: 'amir.delavar@outlook.com',
    totalPrice: 1000000,
    createdAt: '1399/12/29',
    rowVersion: null,
  },
  {
    id: 3,
    customerName: 'امیر دلاور',
    customerEmail: 'amir.delavar@outlook.com',
    totalPrice: 1000000,
    createdAt: '1399/12/29',
    rowVersion: null,
  },
  {
    id: 1,
    customerName: 'امیر دلاور',
    customerEmail: 'amir.delavar@outlook.com',
    totalPrice: 1000000,
    createdAt: '1399/12/29',
    rowVersion: null,
  },
  {
    id: 2,
    customerName: 'امیر دلاور',
    customerEmail: 'amir.delavar@outlook.com',
    totalPrice: 1000000,
    createdAt: '1399/12/29',
    rowVersion: null,
  },
  {
    id: 3,
    customerName: 'امیر دلاور',
    customerEmail: 'amir.delavar@outlook.com',
    totalPrice: 1000000,
    createdAt: '1399/12/29',
    rowVersion: null,
  },
  {
    id: 1,
    customerName: 'امیر دلاور',
    customerEmail: 'amir.delavar@outlook.com',
    totalPrice: 1000000,
    createdAt: '1399/12/29',
    rowVersion: null,
  },
  {
    id: 2,
    customerName: 'امیر دلاور',
    customerEmail: 'amir.delavar@outlook.com',
    totalPrice: 1000000,
    createdAt: '1399/12/29',
    rowVersion: null,
  },
  {
    id: 3,
    customerName: 'امیر دلاور',
    customerEmail: 'amir.delavar@outlook.com',
    totalPrice: 1000000,
    createdAt: '1399/12/29',
    rowVersion: null,
  },
];

export const ORDER_PRODUCT: Array<OrderItemRows> = [
  {
    id: 1,
    brandName: 'اسنوا',
    productCategoryName: 'یخچال',
    productColor: 'نقره ای',
    productId: 1,
    providerName: 'اصغر',
    productImage: {
      alt: 'asdasd',
      src: '',
      title: '',
    },
    productName: 'یخچال',
    productPrice: 2000000,
    rowVersion: null,
  },
  {
    id: 2,
    brandName: 'اسنوا',
    productCategoryName: 'یخچال',
    productColor: 'نقره ای',
    productId: 1,
    providerName: 'اصغر',
    productImage: {
      alt: '',
      src: '',
      title: '',
    },
    productName: 'یخچال',
    productPrice: 2000000,
    rowVersion: null,
  },
  {
    id: 3,
    brandName: 'اسنوا',
    productCategoryName: 'یخچال',
    productColor: 'نقره ای',
    productId: 1,
    providerName: 'اصغر',
    productImage: {
      alt: '',
      src: '',
      title: '',
    },
    productName: 'یخچال',
    productPrice: 2000000,
    rowVersion: null,
  },
];

export const ORDER_INFORMATION = {
  orderId: 123,
  createdDate: '123',
  customerEmail: 'info@gmail.com',
  orderDetail: Order.SUSPENDED,
  plural: 123,
  postCost: 123,
  orderTax: 123,
  allOrders: 123,
  profit: 123,
  paymentMethod: 'شاپرک',
  paymentStatus: Payment.SUSPENDED,
  action: () => {},
};

export const PRODUCT_LIST = {
  table: {
    header: [
      'ردیف',
      'عنوان و کد کالا',
      'گروه کالایی	',
      'برند کالا	',
      'رنگ',
      'نام و نام خانوادگی خریدار',
      'آدرس',
      'کدپستی',
      'شماره تماس',
      'تاریخ سفارش',
      'جزئیات سفارش',
    ],
    row: [...ORDER_PRODUCT],
  },
};

export const SEND_MESSAGE_FORM = [
  {title: 'فروشندگان جدید'},
  {title: 'همه فروشندگان'},
];

export const PRODUCT_REQUEST_MESSAGE: RowProductMessage[] = [
  {id: 1, messageTitle: '', dateTime: '', group: ''},
  {id: 1, messageTitle: '', dateTime: '', group: ''},
  {id: 1, messageTitle: '', dateTime: '', group: ''},
  {id: 1, messageTitle: '', dateTime: '', group: ''},
];

export const MANAGER_USERTYPE = [
  {title: 'مدیریت کل', index: 0},
  {title: 'مدیریت محتوا', index: 0},
  {title: 'مدیریت امور مشتریان', index: 0},
  {title: 'مدیریت درآمد', index: 0},
];

export const SELLER_CITY = [
  {title: 'ciasdasdty'},
  {title: 'citasdasdy'},
  {title: 'citasdasy'},
  {title: 'citsssy'},
  {title: 'citay'},
];

export const SELLER_STATE = [
  {title: 'dfsd'},
  {title: 'sfds'},
  {title: 'stsdfsdate'},
  {title: 'stasdfsdfsdfte'},
  {title: 'stasdte'},
];
