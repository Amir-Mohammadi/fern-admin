import React from 'react';
import style from './main-categories-dataset.module.scss';
import Icons, {IconTypes} from '../icons';

interface props {
  list: {name: string; createAt: string; publishAt: string; status: string}[];
  search: {value: string; onChange: (value:string) => void};
  action: (type: 'edit' | 'delete' | 'archive' | 'publish') => void;
}
export type DatasetProps = props;

const Dataset: React.FC<DatasetProps> = (props) => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.headerRightSide}>
          <div className={style.name}>نام سردسته</div>
          <div className={style.createDate}>تاریخ ایجاد</div>
          <div className={style.publishDate}>تاریخ انتشار</div>
          <div className={style.status}>وضعیت</div>
        </div>
        <div className={style.headerSearch}>
          <Icons type={IconTypes.Search} size={'8.76'} color="#707070" />
          <input value={props.search.value} onChange={(e)=> props.search.onChange(e.target.value)} placeholder=" …جستجو کن" />
        </div>
      </div>
      <div className={style.itemsList}>
        {props.list.map((value, i) => (
          <>
            {(i + 1) % 2 === 0 ? (
              <div className={style.evenItem}>
                <div className={style.evenRightSide}>
                  <div className={style.rowNumber}>
                    {i + 1}
                  </div>
                  <div className={style.name}>
                    {value.name}
                  </div>
                  <div className={style.createDate}>
                    {value.createAt}
                  </div>
                  <div className={style.publishDate}>
                    {value.publishAt}
                  </div>
                  <div className={style.status}>
                    {value.status}
                  </div>
                </div>
                <div className={style.evenLeftSide}>
                  <div className={style.publishBtn}   onClick={()=>props.action('publish')}>
                    <Icons type={IconTypes.Release} size={'10px'} color={'#ffffff'}/>
                  </div>
                  <div className={style.archiveBtn}   onClick={()=>props.action('archive')}>
                    <Icons type={IconTypes.Archive} size={'12px'} color={'#ffffff'}/>
                  </div>
                  <div className={style.deleteBtn}  onClick={()=>props.action('delete')}>
                    <Icons type={IconTypes.Delete} size={'10px'} color={'#ffffff'}/>
                  </div>
                  <div className={style.editBtn}  onClick={()=>props.action('edit')}>
                    <Icons type={IconTypes.Edit} size={'10px'} color={'#ffffff'}/>
                  </div>
                </div>
              </div>
            ) : (
              <div className={style.oddItem}>
                <div className={style.oddRightSide}>
                  <div className={style.rowNumber}>
                    {i + 1}
                  </div>
                  <div className={style.name}>
                    {value.name}
                  </div>
                  <div className={style.createDate}>
                    {value.createAt}
                  </div>
                  <div className={style.publishDate}>
                    {value.publishAt}
                  </div>
                  <div className={style.status}>
                    {value.status}
                  </div>
                </div>
                <div className={style.oddLeftSide}>
                  <div className={style.publishBtn} onClick={()=>props.action('publish')}>
                    <Icons type={IconTypes.Release} size={'10px'} color={'#ffffff'}/>
                  </div>
                  <div className={style.archiveBtn} onClick={()=>props.action('archive')}>
                    <Icons type={IconTypes.Archive} size={'12px'} color={'#ffffff'}/>
                  </div>
                  <div className={style.deleteBtn} onClick={()=>props.action('delete')}>
                    <Icons type={IconTypes.Delete} size={'10px'} color={'#ffffff'}/>
                  </div>
                  <div className={style.editBtn} onClick={()=>props.action('edit')}>
                    <Icons type={IconTypes.Edit} size={'10px'} color={'#ffffff'}/>
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Dataset;
