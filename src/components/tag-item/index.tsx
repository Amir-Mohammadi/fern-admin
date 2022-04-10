import styles from './tag-item.module.scss';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface Props {
  text: string;
  onRemove: () => void;
}

export type TagItemProps = Props;

const TagItem: React.FC<TagItemProps> = (props) => {
  return (
    <div className={styles.container}>
      <button onClick={props.onRemove}>
        <FontAwesomeIcon icon={faTimes} color={'#fff'} />
      </button>
      <span>{props.text}</span>
    </div>
  );
};

export default TagItem;
