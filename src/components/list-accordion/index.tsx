import React from 'react';
import styles from './list-accordion.module.scss';

import Items from '../accordion-item';
import Card from '../colored-header-card';

interface Props {
  title: string;
  list: Array<ListItem>;
  content: React.ReactElement;
  search: {
    value: string;
    onChange: (value: string) => void;
  };
  selectedIndex: number;
  onToggle: (i: number) => void;
}

export type ListItem = {title: string; id?: number};

export type ListAccordionProps = Props;

const ListAccordion: React.FC<ListAccordionProps> = (props) => {
  return (
    <div className={styles.container}>
      <Card title={props.title} search={{...props.search}}>
        <div className={styles.list}>
          {props.list.map((value, i) => (
            <div className={styles.item} key={value.id + i}>
              <Items
                title={value.title}
                toggle={props.selectedIndex == i}
                setToggle={(status: boolean) => {
                  props.onToggle(status ? -1 : i);
                }}>
                {props.content}
              </Items>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ListAccordion;
