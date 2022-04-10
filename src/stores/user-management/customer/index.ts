import {action, observable} from 'mobx';
import {Type} from '../../../components/add-new-user';
import {Editor, Rows, Target} from '../../../components/dataset';
import {ActionType} from '../../../components/icons';
import {
  DATA_SET_HEADER_SEARCHBAR,
  DATA_SET_TABLE_ACTION,
  DATA_SET_TABLE_ROW,
} from '../../../utils/muck';

export default class Customer {
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
  @action handleActions = (target: Target, value?: any) => {
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
    }
  };
}

export interface InjectedCustomerStore {
  customer: Customer;
}
