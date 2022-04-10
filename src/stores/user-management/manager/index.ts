import {action, observable} from 'mobx';
import {title} from 'process';
import api from '../../../api';
import {Type} from '../../../components/add-new-user';
import {Editor, Rows, Target} from '../../../components/dataset';
import {ActionType} from '../../../components/icons';
import {UserRole} from '../../../services/user-management/user-role.enum';
import {
  DATA_SET_HEADER_SEARCHBAR,
  DATA_SET_TABLE_ACTION,
  DATA_SET_TABLE_ROW,
} from '../../../utils/muck';

export default class Manager {
  @observable phone: string = '';
  @observable userType: {title: string; index: number}[] = [
    {title: 'انتخاب', index: 0},
    {title: 'مشتری', index: 1},
    {title: 'بازرگان', index: 2},
    {title: 'پشتیبانی', index: 3},
    {title: 'مدیریت محتوا', index: 4},
    {title: 'حساب دار', index: 5},
    {title: 'مدیریت فروش', index: 6},
    {title: 'مدیریت مالی', index: 7},
    {title: 'مدیریت کل', index: 8},
    {title: 'کارمند فروش', index: 9},
  ];
  @observable selectedUserType: number = -1;
  @observable email: string = '';

  @observable mainTitle: string = '';

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

  private async createUser() {
    try {
      let userType = this.userType[this.selectedUserType].index;
      await api.v1.user.create({
        first_name: null,
        last_name: null,
        email: this.email,
        phone: this.phone,
        user_role: userType,
      });
      this.resetCreateUser();
    } catch (error) {}
  }
  private resetCreateUser() {
    this.selectedUserType = 0;
    this.email = '';
    this.phone = '';
  }
  @action handleActions = async (type: Type | Target, value?: any) => {
    switch (type) {
      case Type.ON_CHANGE_USERNAME:
        this.phone = value;
        break;
      case Type.ON_CHANGE_USERTYPE:
        this.selectedUserType = value;
        break;
      case Type.CHANGE_EMAIL:
        this.email = value;
        break;
      case Type.SUBMIT:
        await this.createUser();
        break;
      case Target.ON_CHANGE:
        break;
      case Target.SET_CHANGE:
        break;
      case Target.CHANGE_EDITOR:
        this.editor = [...this.editor];
        break;

      case Target.EDIT_VALUE:
        this.editor = [...this.rows[value]];
        break;
    }
  };
}

export interface InjectedManagerStore {
  manager: Manager;
}
