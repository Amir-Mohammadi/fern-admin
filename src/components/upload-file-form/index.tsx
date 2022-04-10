import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import styles from './upload-file-form.module.scss';
import DropDown from '../dropdown';
import classNames from 'classnames';
import TagItem from '../tag-item';
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';

export enum Target {
  FORM_LOAD = 'upload-file-form-form-load',
  ADD_IMAGE = 'upload-file-form-add-image',
  REMOVE_IMAGE = 'upload-file-form-remove-image',
  ON_CHANGE_IMAGE_TAG = 'upload-file-form-on-change-image-tag',
  ADD_IMAGE_TAG = 'upload-file-form-add-image-tag',
  REMOVE_IMAGE_TAG = 'upload-file-form-remove-image-tag',
  SELECT_IMAGE = 'upload-file-form-select-image',
  SELECT_TAG = 'upload-file-form-select-tag',
  TAG_INPUT_VALUE_ON_CHANGE = 'upload-file-form-tag-input-value-on-change',
  PUSH_IMAGES = 'upload-file-form-push-images',
}

interface Props {
  images: Array<{fileKey: string; url: string}>;
  tags: Array<{title: string}>;
  imageTags: Array<{fileKey: string; text: string}>;
  selectedImage: number;
  tagInput: {value: string; error: string | null};
  action: (target: Target, value?: any) => void;
}

export type UploadFileFormProps = Props;

const UploadFileForm: React.FC<UploadFileFormProps> = (props) => {
  useEffect(() => {
    props.action!(Target.FORM_LOAD);
    return () => {};
  }, []);
  const [search, setSearch] = useState('');
  return (
    <div className={styles.container}>
      {props.images.length ? (
        <div className={styles.imageForm}>
          <div className={styles.tagForm}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <span>دسته جدید</span>
                <input
                  className={classNames({
                    [styles.dangerInput]: props.tagInput.error,
                  })}
                  type="text"
                  value={props.tagInput.value}
                  onChange={({target}) => {
                    props.action(
                      Target.TAG_INPUT_VALUE_ON_CHANGE,
                      target.value,
                    );
                  }}
                />
                <label>{props.tagInput.error}</label>
              </div>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.success}
                  onClick={() => {
                    props.action(Target.ADD_IMAGE_TAG);
                  }}>
                  ثبت
                </button>
              </div>

              <div className={styles.inputGroup}>
                <span>دسته ها</span>

                <DropDown
                  option={props.tags}
                  selectedIndex={getSameIndex(
                    props.tags,
                    props.imageTags,
                    props.images[props.selectedImage]?.fileKey ,
                  )}
                  search={{
                    input: search,
                    handleChange: (value) => {
                      setSearch(value);
                    },
                  }}
                  disabled={props.selectedImage == -1}
                  checkMode={true}
                  onSelect={(i: number) => {
                    props.action(Target.SELECT_TAG, i);
                  }}
                />
              </div>
            </div>
            <div className={styles.tagsList}>
              {props.imageTags.map((tag, i) => {
                if (tag.fileKey === props.images[props.selectedImage].fileKey) {
                  return (
                    <TagItem
                      text={tag.text}
                      onRemove={() => props.action(Target.REMOVE_IMAGE_TAG, i)}
                    />
                  );
                }
              })}
            </div>
          </div>
          <div className={styles.imageList}>
            {props.images.map((item, i) => (
              <div
                className={classNames({
                  [styles.imageItem]: true,
                  [styles.selectedImage]: i === props.selectedImage,
                })}
                key={i + 'ImAgEiTeM'}
                onClick={(e) => {
                 props.action(Target.SELECT_IMAGE, i);
                }}>
                <img src={item.url} />
                <div className={styles.imageHover}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      props.action(Target.REMOVE_IMAGE, item.fileKey);
                    }}>
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      color={'#db0060'}
                      size={'2x'}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.row}>
            <div className={styles.buttonGroup}>
              <button
                className={styles.success}
                onClick={() => props.action(Target.PUSH_IMAGES)}>
                ذخیره
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.uploadBox}>
          <input
            type="file"
            id="file"
            onChange={(e) => {
              e.stopPropagation();
              props.action(Target.ADD_IMAGE, e.target.files);
            }}
            multiple
          />
          <label htmlFor="file">
            <span>فایلی برای آپلود وجود ندارد</span>
            <span className={styles.bgText}>انتخاب کنید</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default UploadFileForm;

const getSameIndex = (
  allTags: Array<{title: string}>,
  imageTags: Array<{fileKey: string; text: string}>,
  selectImage: string | undefined,
): Array<number> => {
  const selectedNumbers: Array<number> = [];

  if (selectImage) {
    allTags.forEach((tag, index) => {
      imageTags.forEach((imageTag, i) => {
        if (tag.title === imageTag.text && imageTag.fileKey === selectImage) {
          selectedNumbers.push(index);
        }
      });
    });
  }

  return selectedNumbers;
};
