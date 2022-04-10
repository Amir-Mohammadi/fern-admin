import React, {useState} from 'react';
import CargoDatasetList from '../../../../components/dataset/cargo-list';
import styles from '../../customer-services-management.module.scss';

interface Props {}

export type CargoListProps = Props;

const CargoList: React.FC<CargoListProps> = (props) => {
  const [state, setState] = useState(0);
  return (
    <div className={styles.magContainer}>
      <CargoDatasetList />
    </div>
  );
};

export default CargoList;
