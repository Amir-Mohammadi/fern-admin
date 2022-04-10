import {PropagateLoader} from 'react-spinners';
import {Color} from '../../constants/color';
import styles from './loading-dialog.module.scss';

interface Props {
  message: string;
}

export type LoadingDialogProps = Props;

const LoadingDialog: React.FC<LoadingDialogProps> = (props) => {
  return (
    <div className={styles.container}>
      <PropagateLoader color={Color.success} loading={true} size={15} />
      <span className={styles.message}>{props.message}</span>
    </div>
  );
};

export default LoadingDialog;
