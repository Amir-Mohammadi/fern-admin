import {action, observable} from 'mobx';
import {Target as sendMessageTarget} from '../../../../components/send-message-form';
import {
  RowProductMessage,
  Target as productTarget,
} from '../../../../components/dataset/product-request-message';
import {RowProduct} from '../../../../components/dataset/product-request';
import {
  PRODUCT_REQUEST_MESSAGE,
  SEND_MESSAGE_FORM,
} from '../../../../utils/muck';

export default class EleselMessage {
  @observable tableHead: string[] = [
    'شناسه',
    'عنوان پیام',
    'تاریخ ارسال ',
    'دسته بندی ',
    '',
  ];

  @observable rowProduct: RowProductMessage[] = PRODUCT_REQUEST_MESSAGE;

  @observable answerTitle: string = '';

  @action handleActions = (
    target: productTarget | sendMessageTarget,
    value?: any,
  ) => {
    switch (target) {
      case productTarget.ACCEPT:
        console.log('accept');
        break;
      case productTarget.DECLINE:
        console.log('decline');
        break;
      case productTarget.EDIT:
        console.log('edit');
        break;
      case sendMessageTarget.SELECT_GROUP:
        console.log('select-group');
        break;
      case sendMessageTarget.SENDED:
        console.log('sended');
        break;
      case sendMessageTarget.TEXT_EDITOR:
        console.log('text-editor');
        break;
    }
  };

  @observable title: string = '';
  @observable categories: {title: string}[] = SEND_MESSAGE_FORM;
  @observable text: string = '';
}

export interface InjectedEleselMessageStore {
  eleselMessage: EleselMessage;
}
