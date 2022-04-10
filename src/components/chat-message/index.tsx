import {Switch} from 'react-router-dom';
import styles from './chat-message.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faCheckDouble,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

export enum Status {
  Sending,
  Delivered,
  Seen,
}

interface Props {
  message: string;
  status: Status;
  fromMe: boolean;
}

export type ChatMessageProps = Props;

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
  return (
    <div className={styles.container}>
      {props.fromMe ? (
        <div className={styles.fromMe}>
          <div className={styles.messageBorder}>
            <span>{props.message}</span>
          </div>
          <div className={styles.checkFromMe}>{statusRender(props.status)}</div>
        </div>
      ) : (
        <div className={styles.fromAnyOne}>
          <div className={styles.checkFromElse}>
            {statusRender(props.status)}
          </div>
          <div className={styles.messageBorder}>
            <span>{props.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;

const statusRender = (key: Status) => {
  switch (key) {
    case Status.Delivered:
      return <FontAwesomeIcon icon={faCheck} color={'#009289'} />;
    case Status.Sending:
      return <FontAwesomeIcon icon={faClock} color={'#009289'} />;
    case Status.Seen:
      return <FontAwesomeIcon icon={faCheckDouble} color={'#009289'} />;

    default:
      break;
  }
};
