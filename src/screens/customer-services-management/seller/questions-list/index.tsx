import React, {useState} from 'react';
import styles from '../../customer-services-management.module.scss';

interface Props {}

export type QuestionsListProps = Props;

const QuestionsList: React.FC<QuestionsListProps> = (props) => {
  const [state, setState] = useState(0);
  return <div className={styles.magContainer}></div>;
};

export default QuestionsList;
