import {Editor, Rows, Target} from '../../../components/dataset';
import {Target as InfoType} from '../../../components/seller-info-form';
import {Target as AddressType} from '../../../components/seller-address-form';
import {Target as ContractType} from '../../../components/contract-info';
import {action, observable} from 'mobx';
import {
  ADD_PRODUCT,
  DATA_SET_HEADER_SEARCHBAR,
  DATA_SET_TABLE_ACTION,
  DATA_SET_TABLE_ROW,
  SELLER_CITY,
  SELLER_STATE,
} from '../../../utils/muck';
import {ActionType} from '../../../components/icons';
import {useState} from 'react';

export default class Seller {
  // ****************  DATASET *********************

  @observable title: string = 'لیست کاربران';
  @observable searchBar: {
    visible: boolean;
    placeHolder: string;
    value: string;
  } = DATA_SET_HEADER_SEARCHBAR;

  @observable header: string[] = [
    'نام و نام خانوادگی',
    'نام  کاربری',
    'ایمیل',
    'تاریخ عضویت',
  ];

  @observable rows: Rows[][] = DATA_SET_TABLE_ROW;
  @observable handleTableActions: {
    type: ActionType;
    title: string;
  }[] = DATA_SET_TABLE_ACTION;
  @observable editor: Editor[] = [
    {text: '', editable: true},
    {text: '', editable: true},
    {text: '', editable: true},
  ];

  // *************** BUTTON ***********************

  @observable buttonTitle: string = 'ثبت فروشنده جدید';

  // *************** SELLER_INFO ******************

  @observable infoName: string = '';
  @observable infoUserName: string = '';
  @observable infoPersonality: number = -1;
  @observable infoGender: number = -1;
  @observable infoBirthDate: string = '';
  @observable infoNaturalCode: string = '';
  @observable infoNaturalNumber: string = '';
  @observable password: string = '';

  // ***************** SELLER_ADDRESS ***************

  @observable states: {title: string}[] = SELLER_STATE;
  @observable cities: {title: string}[] = SELLER_CITY;
  @observable selectedState: number = -1;
  @observable selectedCity: number = -1;
  @observable postalCode: string = '';
  @observable mobile: string = '';
  @observable street: string = '';
  @observable tel: string = '';
  @observable alley: string = '';
  @observable email: string = '';
  @observable plaque: string = '';
  @observable website: string = '';

  // *************** CONTRACT_INFO *****************

  @observable contractCode: string = '';
  @observable contractPath: string = '';
  @observable createDate: string = '';
  @observable finishDate: string = '';

  // ****************** HANDLE_PAGES ***************

  @observable selectedIndex: number = 0;

  // ******************* ACTIONS ******************

  @action handleActions = (
    target: Target | InfoType | AddressType | ContractType,
    value?: any,
  ) => {
    switch (target) {
      case Target.ON_CHANGE:
        console.log('ON-CHANGE');
        break;
      case Target.SET_CHANGE:
        console.log('SET-CHANGE');
        break;
      case Target.CHANGE_EDITOR:
        this.editor = [...this.editor];
        break;
      case Target.EDIT_VALUE:
        this.editor = [...this.rows[value]];
        break;
      case InfoType.NAME:
        this.infoName = value;
        break;
      case InfoType.GENDER:
        this.infoGender = value;
        break;
      case InfoType.NATURAL_CODE:
        this.infoNaturalCode = value;
        break;
      case InfoType.NATURAL_NUMBER:
        this.infoNaturalNumber = value;
        break;
      case InfoType.NEXT_PAGE:
        this.selectedIndex = 1;
        break;
      case InfoType.PASSWORD:
        this.password = value;
        break;
      case InfoType.PERSONALITY:
        this.infoPersonality = value;
        break;
      case InfoType.USERNAME:
        this.infoUserName = value;
        break;
      case AddressType.ALLEY:
        this.alley = value;
        break;
      case AddressType.EMAIL:
        this.email = value;
        break;
      case AddressType.NEXT_PAGE:
        this.selectedIndex = 2;
        break;
      case AddressType.PHONE:
        this.mobile = value;
        break;
      case AddressType.PLAQUE:
        this.plaque = value;
        break;
      case AddressType.POSTAL_CODE:
        this.postalCode = value;
        break;
      case AddressType.SELECTED_CITY:
        this.selectedCity = value;
        break;
      case AddressType.SELECTED_STATE:
        this.selectedState = value;
        break;
      case AddressType.STREET:
        this.street = value;
        break;
      case AddressType.TEL:
        this.tel = value;
        break;
      case AddressType.WEBSITE:
        this.website = value;
        break;
      case ContractType.CODE:
        this.contractCode = value;
        break;
      case ContractType.CREATE_DATE:
        this.createDate = value;
        break;
      case ContractType.FINISH_DATE:
        this.finishDate = value;
        break;
      case ContractType.PATH:
        this.contractPath = value;
        break;
      case ContractType.SET_INFO:
        console.log('SET-INFO');
        break;
    }
  };
}

export interface InjectedSellerStore {
  seller: Seller;
}
