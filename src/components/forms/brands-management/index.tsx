import classNames from 'classnames';
import React, {useState} from 'react';
import BrandsListDataSet, {
  BrandsListDataSetProps,
  Target as BrandsListTarget,
} from '../../dataset/brands-list';

import styles from './brands-management.module.scss';

export enum Target {
  ON_CHANGE_NAME = 'brand-on-change-name',
  ON_CHANGE_URL_TITLE = 'brand-on-change-url-title',
  ON_CHANGE_IMAGE_TITLE = 'brand-on-change-image-title',
  ON_CHANGE_IMAGE_ALT = 'brand-on-change-image-alt',
  ON_CHANGE_BROWSER_TITLE = 'brand-on-change-browser-title',
  ON_CHANGE_META_DESCRIPTION = 'brand-on-change-meta-description',
  ON_CHANGE_DESCRIPTION = 'brand-on-change-description',
  BRAND_LOGO = 'brand-logo',
  ON_SUBMIT = 'brand-on-submit',
  ADD_IMAGE = 'add_image',
}

interface props {
  name: string;
  urlTitle: string;
  imageTitle: string;
  imageAlt: string;
  browserTitle: string;
  metaDescription: string;
  description: string;
  brandImageUrl: string;
  brands: BrandsListDataSetProps;
  action: (target: Target | BrandsListTarget, value?: any) => void;
}

export type BrandManagementProps = props;

const BrandManagement: React.FC<BrandManagementProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <span>عنوان برند</span>
            <input
              type="text"
              value={props.name}
              onChange={({target}) =>
                props.action(Target.ON_CHANGE_NAME, target.value)
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <span>عنوان آدرس</span>
            <input
              type="text"
              value={props.urlTitle}
              onChange={({target}) =>
                props.action(Target.ON_CHANGE_URL_TITLE, target.value)
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <span>عنوان مرورگر</span>
            <input
              type="text"
              value={props.browserTitle}
              onChange={({target}) =>
                props.action(Target.ON_CHANGE_BROWSER_TITLE, target.value)
              }
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <span>توضیحات</span>
            <input
              type="text"
              value={props.description}
              onChange={({target}) =>
                props.action(Target.ON_CHANGE_DESCRIPTION, target.value)
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <span>توضیحات متا</span>
            <input
              type="text"
              value={props.metaDescription}
              onChange={({target}) =>
                props.action(Target.ON_CHANGE_META_DESCRIPTION, target.value)
              }
            />
          </div>
        </div>
        <div className={styles.row}>
          <div
            className={classNames({
              [styles.imageContainer]: true,
            })}>
            <div
              className={classNames({
                [styles.imageInput]: true,
                [styles.hiddenInput]: props.brandImageUrl !== '',
              })}>
              <input
                type="file"
                id="file"
                onChange={(e) => {
                  e.stopPropagation();
                  props.action(Target.ADD_IMAGE, e.target.files);
                }}
              />
              <label htmlFor="file">انتخاب</label>
            </div>
            <img
              className={classNames({
                [styles.image]: true,
                [styles.hiddenImage]: props.brandImageUrl == '',
              })}
              src={props.brandImageUrl}
            />
          </div>
          {props.brandImageUrl !== '' && (
            <div className={styles.imageInfo}>
              <div className={styles.inputGroup}>
                <span>عنوان</span>
                <input
                  type="text"
                  value={props.imageTitle}
                  onChange={({target}) =>
                    props.action(Target.ON_CHANGE_IMAGE_TITLE, target.value)
                  }
                />
              </div>
              <div className={styles.inputGroup}>
                <span>متن جایگزین</span>
                <input
                  type="text"
                  value={props.imageAlt}
                  onChange={({target}) =>
                    props.action(Target.ON_CHANGE_IMAGE_ALT, target.value)
                  }
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.row}>
          <div className={styles.buttonGroup}>
            <button className={styles.danger} onClick={() => {}}>
              لغو
            </button>
            <button
              className={styles.success}
              onClick={() => props.action(Target.ON_SUBMIT)}>
              ثبت
            </button>
          </div>
        </div>
      </div>

      <div className={styles.box}>
        <BrandsListDataSet
          {...props.brands}
          action={(target, value?) => props.action(target, value)}
        />
      </div>
    </div>
  );
};

export default BrandManagement;
