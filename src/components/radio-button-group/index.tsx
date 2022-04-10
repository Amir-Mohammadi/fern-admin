import styles from './radio-button-group.module.scss';
import classNames from 'classnames';

interface Props {
  label?: string;
  options: string[];
  selected: number;
  handleSelect: (i: number) => any;
}

export type RadioButtonGroupProps = Props;

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.labelBox}>{props.label}</div>
      <div>{renderOptions(props)}</div>
    </div>
  );
};

export default RadioButtonGroup;

const renderOptions = (input: RadioButtonGroupProps) =>
  input.options.map((item, i) => (
    <li>
      <div
        className={classNames({
          [styles.radioButton]: true,
          [styles.selected]: input.selected == i,
        })}
        onClick={() => input.handleSelect(i)}></div>
      <span>{item}</span>
    </li>
  ));
