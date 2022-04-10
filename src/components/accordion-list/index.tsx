import React from 'react';
import Icons, {IconTypes} from '../icons';
import style from './accordion-list.module.scss';

interface Props {
  data: {
    title: string;
    content: React.ReactElement<any>;
  }[];
  onClick: (index: any) => any;
  selectedIndex: number;
}

export type AccordionListProps = Props;
function MyF(i: number, j: number) {}

const AccordionList: React.FC<AccordionListProps> = (props) => {
  return (
    <div className={style.container}>
      <div className={style.bottom}>
        {props.data.map((value, i) => (
          <div className={style.accordionItem} key={i + 'AcCoRdIoN'}>
            <div
              className={style.accordion}
              onClick={() => props.onClick(i === props.selectedIndex ? -1 : i)}>
              <span>{value.title}</span>
              <div className={style.icon}>
                {i !== props.selectedIndex ? (
                  <Icons
                    type={IconTypes.ShiftLeft}
                    color={'#ffffff'}
                    size={'11'}
                  />
                ) : (
                  <Icons
                    type={IconTypes.ShiftDown}
                    color={'#ffffff'}
                    size={'11'}
                  />
                )}
              </div>
            </div>
            {i === props.selectedIndex ? (
              <div className={style.panel}>{value.content}</div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccordionList;
