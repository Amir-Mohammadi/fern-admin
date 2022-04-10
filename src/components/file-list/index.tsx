import {faCopy} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import DropDown from '../dropdown';
import copy from 'copy-to-clipboard';

import styles from './file-list.module.scss';

export enum Target {
  FORM_LOAD = 'file-list-form-load',
  SELECT_TAG = 'file-list-select-tag',
  SELECT_IMAGE_AS_PREVIEW = 'file-list-select-image-as-preview',
}

interface props {
  tags: Array<{title: string}>;
  images: Array<{fileKey: string; url: string}>;
  previewIndex: number;
  selectedTag: number;
  action: (target: Target, value?: any) => void;
}

export type FileListProps = props;

const FileList: React.FC<FileListProps> = (props) => {
  useEffect(() => {
    props.action!(Target.FORM_LOAD);
    return () => {};
  }, []);
  const [search, setSearch] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.filterForm}>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <span>دسته مورد نظر</span>
            <DropDown
              option={props.tags}
              selectedIndex={[props.selectedTag]}
              search={{
                input: search,
                handleChange: (value) => {
                  setSearch(value);
                },
              }}
              onSelect={(i: number) => {
                props.action(Target.SELECT_TAG, i);
              }}
            />
          </div>
          <div className={styles.inputGroup}></div>
        </div>
      </div>
      {props.images.length ? (
        <div className={styles.gallery}>
          <div className={styles.preview}>
            <img src={props.images[props.previewIndex].url} alt="" />
          </div>
          <div className={styles.files}>
            {props.images.map((item, i) => (
              <div
                className={classNames({
                  [styles.imageItem]: true,
                  [styles.selectedImage]: i === props.previewIndex,
                })}
                key={i + 'ImAgEiTeM'}
                onClick={(e) => {
                  props.action(Target.SELECT_IMAGE_AS_PREVIEW, i);
                }}>
                <img src={item.url} />
                <div className={styles.imageHover}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copy(item.url);
                    }}>
                    <FontAwesomeIcon
                      icon={faCopy}
                      color={'#db0060'}
                      size={'2x'}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.nullContainer}>تصویری برای نمایش وجود ندارد</div>
      )}
    </div>
  );
};
export default FileList;
