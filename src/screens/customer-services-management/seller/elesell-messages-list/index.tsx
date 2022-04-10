import React, {useState} from 'react';
import AccordionList from '../../../../components/accordion-list';
import ProductRequestMessage, {
  ProductRequestMessageProps,
} from '../../../../components/dataset/product-request-message';
import SendMessageForm, {
  SendMessageFormProps,
} from '../../../../components/send-message-form';
import styles from '../../customer-services-management.module.scss';

interface Props {
  productRequestMessage: ProductRequestMessageProps;
  sendMessageForm: SendMessageFormProps;
}

export type ElesellMessagesListProps = Props;

const ElesellMessagesList: React.FC<ElesellMessagesListProps> = (props) => {
  const [state, setState] = useState(0);
  return (
    <div className={styles.magContainer}>
      <div>
        <AccordionList
          data={[
            {
              title: 'ارسال پیام',
              content: <SendMessageForm {...props.sendMessageForm} />,
            },
          ]}
          selectedIndex={0}
          onClick={() => {}}
        />
      </div>
      <div>
        <AccordionList
          data={[
            {
              title: 'لیست کل پیام های ارسال شده ',
              content: (
                <ProductRequestMessage {...props.productRequestMessage} />
              ),
            },
          ]}
          selectedIndex={state}
          onClick={(i) => setState(i)}
        />
      </div>
    </div>
  );
};

export default ElesellMessagesList;
