import React, {useEffect, useState} from 'react';
import {CATEGORY_TYPE} from '../../../utils/types/enums';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage, faTimes} from '@fortawesome/free-solid-svg-icons';

import DropDown from '../../dropdown';
import ProductFeatureInputItem, {
  ProductFeatureInputItemProps,
  Target as ProductFeatureInputItemTarget,
} from '../../product-feature-input-item';
import RoundedAccordionItems, {
  RoundedTypes,
} from '../../rounded-accordion-item';
import TextEditor from '../../text-editor';
import styles from './add-new-product.module.scss';
import ListItem, {Mode} from '../../list-item';
import PopUP, {PopUpProps} from '../../pop-up';
import LoadingDialog from '../../loading-dialog';

import OtherFeatures, {
  Target as OtherFeaturesTarget,
  OtherFeaturesProps,
} from '../other-features';
import TagItem from '../../tag-item';
import FileManagement from '../../../containers/file-management';
import AddProductSizeForm, {
  AddProductSizeFormProps,
  Target as ProductSizeTarget,
} from '../../add-product-size';
import AddProductColorForm, {
  AddProductColorFormProps,
  Target as ProductColorTarget,
} from '../../add-product-color';

export enum Target {
  PRODUCT_TITLE = 'product-title',
  PRODUCT_URL_LINK = 'product-url-link',
  PRODUCT_BROWSER_TITLE = 'product-browser-title',
  PRODUCT_META_DESCRIPTION = 'product-meta-description',
  PRODUCT_TAG = 'product-tag',
  ADD_PRODUCT_TAG = 'add-product-tag',
  REMOVE_PRODUCT_TAG = 'remove-product-tag',
  SELECTED_CATEGORY = 'selected-category',
  PRODUCT_DESCRIPTION = 'product-description',
  LOAD_FEATURES = 'load-features',
  SET_FEATURE = 'set-feature',
  PRODUCT_DISCOUNT = 'product-discount',
  SELECTED_BRAND = 'selected-brand',
  ADD_PRODUCT = 'add-product',
  FORM_LOAD = 'product-form-load',
  ADD_STATIC_FEATURE = 'add-static-feature',
  STATIC_FEATURE = 'static-feature',
  ADD_IMAGES = 'add_images',
  SELECTED_IMAGE = 'selected_image',
  REMOVE_IMAGE = 'remove_image',
  REMOVE_OTHER_FEATURE = 'remove-other-feature',
  ON_CHANGE_HAS_EXTRA = 'on-change-has-extra',
  ON_CHANGE_IMAGE_TITLE = 'on-change-image-title',
  ON_CHANGE_IMAGE_ALT = 'on-change-image-alt',
  SET_EDIT_VALUES = 'set-edit-values',
  IMPORT_BACKUP = 'import-backup',
}

export type FeatureType = {
  id: number;
  title: string;
  type: number;
  hasExtra: boolean;
  otherFeatures: OtherFeaturesProps;
  items: ProductFeatureInputItemProps[];
};

interface props {
  productTitle: string;
  productUrlLink: string;
  productBrowserTitle: string;
  tag: string;
  productTags: {text: string}[];
  productMetaDescription: string;
  popUp: {status: boolean; data: PopUpProps};
  loading: {
    status: boolean;
    message: string;
  };
  categories: {title: string}[];
  selectedCategory: number;
  brands: {title: string}[];
  productPriceFrom: number;
  productPriceTo: number;
  productDiscount: number;
  selectedBrand: number;
  productDescription: string;
  features: FeatureType[];
  action: (
    target:
      | Target
      | OtherFeaturesTarget
      | ProductSizeTarget
      | ProductColorTarget
      | ProductFeatureInputItemTarget,
    value?: any,
  ) => void;
  createBackup: () => {};
  otherFeatures: string[];
  staticFeature: string;
  images: {fileKey: string; url: string; title: string; alt: string}[];
  selectedImage: number;
  productSize: AddProductSizeFormProps;
  productColor: AddProductColorFormProps;
}

export type AddNewProductProps = props;

const AddNewProduct: React.FC<AddNewProductProps> = (props) => {
  useEffect(() => {
    props.action(Target.FORM_LOAD);
    return () => {};
  }, []);
  const [featureToggle, setFeatureToggle] = useState(-1);
  const [galleryToggle, setGalleryToggle] = useState(false);
  const [search, setSearch] = useState('');
  const backupName = props.productTitle.length
    ? `${props.productTitle}-${Date.now()}`
    : `product-backup-${Date.now()}`;

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.actionBar}>
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(props.createBackup()),
            )}`}
            download={`${backupName}.json`}>
            {/* <FontAwesomeIcon icon={faFileExport} /> */}
            export
          </a>

          <div>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => {
                e.stopPropagation();
                props.action(Target.IMPORT_BACKUP, e.target.files);
              }}
            />

            <label htmlFor="fileInput">
              {/* <FontAwesomeIcon icon={faFileImport} width={'1.125em'} /> */}
              restore
            </label>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <span>عنوان محصول</span>
            <input
              type="text"
              value={props.productTitle}
              onChange={({target}) =>
                props.action(Target.PRODUCT_TITLE, target.value)
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <span>عنوان صفحه</span>
            <input
              type="text"
              value={props.productBrowserTitle}
              onChange={({target}) =>
                props.action(Target.PRODUCT_BROWSER_TITLE, target.value)
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <span>متن url</span>
            <input
              type="text"
              value={props.productUrlLink}
              onChange={({target}) =>
                props.action(Target.PRODUCT_URL_LINK, target.value)
              }
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <span>دسته والد</span>
            <DropDown
              option={props.categories}
              selectedIndex={[props.selectedCategory]}
              search={{
                input: search,
                handleChange: (value) => {
                  setSearch(value);
                },
              }}
              onSelect={(i: number) => {
                props.action(Target.SELECTED_CATEGORY, i);
                props.action(Target.LOAD_FEATURES);
              }}
            />
          </div>
          <div className={styles.inputGroup}>
            <span>برند </span>
            <DropDown
              option={props.brands}
              selectedIndex={[props.selectedBrand]}
              search={{
                input: search,
                handleChange: (value) => {
                  setSearch(value);
                },
              }}
              onSelect={(i: number) => {
                props.action(Target.SELECTED_BRAND, i);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>
              <span>توضیحات متا </span>
              <span>{`${props.productMetaDescription.length}/40`}</span>
            </div>
            <textarea
              value={props.productMetaDescription}
              maxLength={40}
              onChange={({target}) => {
                props.action(Target.PRODUCT_META_DESCRIPTION, target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.row}>
          <button
            className={styles.linkBtn}
            onClick={() => setGalleryToggle(true)}>
            گالری
          </button>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <span>توضیحات</span>
            <div className={styles.textBox}>
              <TextEditor
                value={props.productDescription}
                onChange={(v) => props.action(Target.PRODUCT_DESCRIPTION, v)}
              />
            </div>
          </div>
        </div>
      </div>

      {props.selectedCategory > -1 && (
        <div className={styles.box}>
          {props.features.map((feature, fI) => (
            <RoundedAccordionItems
              title={feature.title}
              type={RoundedTypes.ColoredRounded}
              toggle={fI == featureToggle}
              setToggle={() => {
                fI == featureToggle
                  ? setFeatureToggle(-1)
                  : setFeatureToggle(fI);
              }}
              content={
                feature.type == 5 ? (
                  renderOtherInfoForm(props)
                ) : (
                  <div className={styles.features}>
                    <div className={styles.featuresItem}>
                      {feature.items?.map((item, iI) => (
                        <ProductFeatureInputItem
                          {...item}
                          key={iI + 'PrOdUcTfEaT'}
                          action={(target, value) => {
                            if (
                              target === ProductFeatureInputItemTarget.ON_CHANGE
                            ) {
                              const temp = [...props.features];
                              switch (item.type) {
                                case CATEGORY_TYPE.list:
                                  if (item.has_multiple) {
                                    if (
                                      temp[fI].items[iI].values?.includes(
                                        +value,
                                      )
                                    ) {
                                      var index = temp[fI].items[
                                        iI
                                      ].values!.indexOf(+value);
                                      temp[fI].items[iI].values?.splice(
                                        index,
                                        1,
                                      );
                                    } else {
                                      temp[fI].items[iI].values?.push(+value);
                                    }
                                  } else {
                                    temp[fI].items[iI].values = [+value];
                                  }

                                  break;
                                case CATEGORY_TYPE.text:
                                  temp[fI].items[iI].textValue =
                                    value.toString();
                                  break;
                                default:
                                  break;
                              }
                              props.action(target, temp);
                            } else {
                              props.action(target, value);
                            }
                          }}
                        />
                      ))}
                    </div>
                    <span className={styles.otherFeaturesToggle}>
                      <input
                        type={'checkbox'}
                        checked={feature.hasExtra}
                        onChange={() => {
                          props.action(Target.ON_CHANGE_HAS_EXTRA, fI);
                        }}
                      />
                      ایجاد سایر ویژگی ها
                    </span>
                    {feature.hasExtra && (
                      <OtherFeatures
                        {...feature.otherFeatures}
                        featureTitle={feature.title}
                        action={(target, value) => {
                          feature.otherFeatures = value.features;
                          props.action(target, value.deletedId);
                        }}
                      />
                    )}
                  </div>
                )
              }
              key={fI + 'RoUnDeDAcC'}
            />
          ))}

          <RoundedAccordionItems
            title="برچسب ها"
            type={RoundedTypes.ColoredRounded}
            toggle={featureToggle == props.features.length + 1}
            setToggle={() => {
              featureToggle == props.features.length + 1
                ? setFeatureToggle(-1)
                : setFeatureToggle(props.features.length + 1);
            }}
            content={renderTagInputForm(props)}
          />
          <RoundedAccordionItems
            title="تصاویر"
            type={RoundedTypes.ColoredRounded}
            toggle={featureToggle == props.features.length + 2}
            setToggle={() => {
              featureToggle == props.features.length + 2
                ? setFeatureToggle(-1)
                : setFeatureToggle(props.features.length + 2);
            }}
            content={renderImageSelector(props)}
          />
          <RoundedAccordionItems
            title="اندازه"
            type={RoundedTypes.ColoredRounded}
            toggle={featureToggle == props.features.length + 3}
            setToggle={() => {
              featureToggle == props.features.length + 3
                ? setFeatureToggle(-1)
                : setFeatureToggle(props.features.length + 3);
            }}
            content={
              <AddProductSizeForm
                {...props.productSize}
                action={props.action}
              />
            }
          />

          <RoundedAccordionItems
            title="رنگ"
            type={RoundedTypes.ColoredRounded}
            toggle={featureToggle == props.features.length + 4}
            setToggle={() => {
              featureToggle == props.features.length + 4
                ? setFeatureToggle(-1)
                : setFeatureToggle(props.features.length + 4);
            }}
            content={
              <AddProductColorForm
                {...props.productColor}
                action={props.action}
              />
            }
          />
        </div>
      )}
      <div className={styles.box}>
        <div className={styles.row}>
          <div className={styles.buttonGroup}>
            <button className={styles.danger} onClick={() => {}}>
              لغو
            </button>
            <button
              className={styles.success}
              onClick={() => props.action(Target.ADD_PRODUCT)}>
              ثبت
            </button>
          </div>
        </div>
      </div>
      {galleryToggle && (
        <div className={styles.galleryDialog}>
          <div className={styles.box}>
            <div className={styles.boxHD}>
              <button
                onClick={() => {
                  setGalleryToggle(false);
                }}>
                <FontAwesomeIcon icon={faTimes} color={'#db0060'} size={'2x'} />
              </button>
            </div>
            <div className={styles.boxBD}>
              <FileManagement />
            </div>
          </div>
        </div>
      )}
      {props.loading.status && (
        <LoadingDialog message={props.loading.message} />
      )}
      {props.popUp.status && <PopUP {...props.popUp.data} />}
    </div>
  );
};

export default AddNewProduct;

const renderImageSelector = (props: AddNewProductProps) => {
  return (
    <div style={{flexDirection: 'column'}}>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <span>تصاویر</span>
          <div>
            <input
              type="file"
              id="file"
              onChange={(e) => {
                e.stopPropagation();
                props.action(Target.ADD_IMAGES, e.target.files);
              }}
              multiple
            />

            <label htmlFor="file">انتخاب</label>
          </div>
        </div>
      </div>
      {props.images.length ? (
        <div className={styles.imageGallery}>
          <div className={styles.preview}>
            <div className={styles.infoBX}>
              <div className={styles.infoHD}>
                <FontAwesomeIcon className={styles.removeBtn} icon={faTimes} />
              </div>
              <div className={styles.infoBD}>پیشنمایش</div>
            </div>
            <img src={props.images[props.selectedImage]?.url} />
          </div>

          <div className={styles.list}>
            {props.images.map((item, i) => (
              <div className={styles.imageItem} key={i + 'ImAgEiTeM'}>
                <div className={styles.image}>
                  <div className={styles.infoBX}>
                    <div className={styles.infoBD}>
                      {1 + i}
                      <div className={styles.infoHD}>
                        <FontAwesomeIcon
                          className={styles.removeBtn}
                          icon={faTimes}
                          onClick={() => props.action(Target.REMOVE_IMAGE, i)}
                        />
                        <FontAwesomeIcon
                          className={styles.selectBtn}
                          icon={faImage}
                          onClick={() => props.action(Target.SELECTED_IMAGE, i)}
                        />
                      </div>
                    </div>
                  </div>
                  <img src={item.url} />
                </div>

                <div className={styles.imageDes}>
                  <input
                    type="text"
                    placeholder={'عنوان'}
                    value={item.title}
                    onChange={({target}) => {
                      item.title = target.value;
                      props.action(Target.ON_CHANGE_IMAGE_TITLE);
                    }}
                  />
                  <input
                    type="text"
                    placeholder={'متن جایگزین'}
                    value={item.alt}
                    onChange={({target}) => {
                      item.alt = target.value;
                      props.action(Target.ON_CHANGE_IMAGE_ALT);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const renderTagInputForm = (props: AddNewProductProps) => {
  return (
    <div className={styles.tagForm}>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={props.tag}
            onChange={({target}) =>
              props.action(Target.PRODUCT_TAG, target.value)
            }
            onKeyPress={({key}) => {
              if (key == 'Enter') {
                props.action(Target.ADD_PRODUCT_TAG);
              }
            }}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={styles.success}
            onClick={() => props.action(Target.ADD_PRODUCT_TAG)}>
            ایجاد برچسب
          </button>
        </div>
      </div>
      <div className={styles.tagList}>
        {props.productTags.map((item, i) => (
          <TagItem
            key={i + 'tAgItEm'}
            text={item.text}
            onRemove={() => props.action(Target.REMOVE_PRODUCT_TAG, i)}
          />
        ))}
      </div>
    </div>
  );
};

const renderOtherInfoForm = (props: AddNewProductProps) => {
  return (
    <div className={styles.otherFeatures}>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={props.staticFeature}
            onChange={({target}) =>
              props.action(Target.STATIC_FEATURE, target.value)
            }
          />
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={styles.success}
            onClick={() => props.action(Target.ADD_STATIC_FEATURE)}>
            ایجاد مشخصه
          </button>
        </div>
      </div>
      {props.otherFeatures.map((item, i) => (
        <div className={styles.row}>
          <ListItem
            key={i.toString() + item}
            mode={Mode.Stable}
            value={item}
            action={(target) => {
              switch (target) {
                case 'remove':
                  props.action(Target.REMOVE_OTHER_FEATURE, i);
                  break;

                default:
                  break;
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};
