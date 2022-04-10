import React, {useState} from 'react';
import styles from '../../customer-services-management.module.scss';

interface Props {}

export type CreateProductRequestProps = Props;

const CreateProductRequest: React.FC<CreateProductRequestProps> = (props) => {
  const [state, setState] = useState(0);
  return <div className={styles.magContainer}></div>;
};

export default CreateProductRequest;
