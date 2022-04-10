import {action, observable} from 'mobx';

export default class CMPNavigate {
  @observable currentScreen: number = -1;

  @action goto = (target: number) => {
    this.currentScreen = target;
  };
}

export interface InjectedCMPNavigateStore {
  cmpNavigate: CMPNavigate;
}
