import React, {useState} from 'react';
import styles from './add-contact-us.module.scss';
import AddButtonBG from '../../add-button-bg';
import ListItem, {Mode} from '../../list-item';

interface Props {
  title: string;
  onChange: (value: string) => void;
  row: {title: string; subItem?: {title: string}[]}[];
  action: (r: {title: string; subItem?: {title: string}[]}[]) => void;
}

export type ContactUsProps = Props;

const ContactUs: React.FC<ContactUsProps> = (props) => {
  const [addButton, setAddButton] = useState(true);

  return (
    <div className={styles.container}>
      {addButton ? (
        <div className={styles.head}>
          <AddButtonBG
            title="ایجاد تماس با ما جدید"
            onClick={(e) => setAddButton(e)}
          />
        </div>
      ) : (
        <div className={styles.middle}>
          <span>عنوان</span>
          <input
            type="text"
            value={props.title}
            onChange={({target}) => props.onChange(target.value)}
            onKeyPress={(event: React.KeyboardEvent<HTMLDivElement>) =>
              handleAnswerChange(event, props)
            }
          />
        </div>
      )}

      <div className={styles.bottom}>
        {props.row?.map((value) => (
          <div className={styles.items}>
            <span>{value.title}</span>
            <ListItem mode={Mode.Add} action={(target) => {}} value={''} />
            {value.subItem?.map((item) => (
              <ListItem
                mode={Mode.Stable}
                action={(target) => {}}
                value={item.title}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <button>
          <span>لغو</span>
        </button>
        <button className={styles.secondButton}>
          <span>بارگذاری</span>
        </button>
      </div>
    </div>
  );
};

export default ContactUs;

const handleAnswerChange = (
  event: React.KeyboardEvent<HTMLDivElement>,
  props: ContactUsProps,
) => {
  if (event.key == 'Enter') {
    eventHandler(props);
  } else {
    return null;
  }
};

const eventHandler = (props: ContactUsProps) => {
  const temp = [...props.row];
  temp.push({title: props.title, subItem: []});
  props.action(temp);
};
