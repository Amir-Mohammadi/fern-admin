import Icons, {IconTypes} from '../icons';
import styles from './chat-room-header.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faListAlt,
  faPauseCircle,
  faShareSquare,
  faStopCircle,
} from '@fortawesome/free-solid-svg-icons';

interface Props {
  avatar?: string;
  username: string;
  action: (target: 'pause' | 'stop' | 'blackList' | 'export') => void;
}

export type ChatRoomHeaderProps = Props;

const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.rightSide}>
        <div className={styles.information}>
          <div className={styles.avatar}>
            {props.avatar ? (
              <span></span>
            ) : (
              <Icons type={IconTypes.Logo} size={'30'} color={'#d3d3d3'} />
            )}
          </div>

          <span>{props.username}</span>
        </div>
        <div className={styles.detail}>
          <div className={styles.time}>
            <span>14:25</span>
          </div>
          <div className={styles.share} onChange={() => props.action('export')}>
            <FontAwesomeIcon icon={faShareSquare} color={'#707070'} />
            <span>انتقال گفتگو</span>
          </div>
          <div
            className={styles.list}
            onChange={() => props.action('blackList')}>
            <FontAwesomeIcon icon={faListAlt} color={'#707070'} />
            <span>لیست سیاه</span>
          </div>
        </div>
      </div>
      <div className={styles.leftSide}>
        <button onClick={() => props.action('stop')}>
          <FontAwesomeIcon icon={faStopCircle} color={'#ffffff'} />
          <span>بستن مکالمه</span>
        </button>
        <button className={styles.pause} onClick={() => props.action('pause')}>
          <FontAwesomeIcon icon={faPauseCircle} color={'#ffffff'} />
          <span>توقف مکالمه</span>
        </button>
      </div>
    </div>
  );
};

export default ChatRoomHeader;
