import {action, observable} from 'mobx';

import {Target as uploadFileFormTargets} from '../../components/upload-file-form';
import {Target as fileListTargets} from '../../components/file-list';

import {IGetFileTagQuery} from '../../api/models';
import FileManagementService from '../../services/file-management';

type Target = uploadFileFormTargets | fileListTargets;

export default class FileManagement {
  fileManagementService: FileManagementService;

  constructor() {
    this.fileManagementService = new FileManagementService();
  }

  @action handleActions = (target: Target, value?: any) => {
    switch (target) {
      case uploadFileFormTargets.FORM_LOAD:
        this.loadGalleryTags();
        break;
      case uploadFileFormTargets.ADD_IMAGE:
        this.selectImages(value);
        break;
      case uploadFileFormTargets.SELECT_IMAGE:
        this.selectedImage = value;
        break;
      case uploadFileFormTargets.REMOVE_IMAGE:
        this.removeImage(value);
        break;
      case uploadFileFormTargets.ADD_IMAGE_TAG:
        this.addImageTag();
        break;
      case uploadFileFormTargets.REMOVE_IMAGE_TAG:
        this.removeImageTag(value);
        break;
      case uploadFileFormTargets.TAG_INPUT_VALUE_ON_CHANGE:
        this.tagInput = {value: value, error: ''};
        break;
      case uploadFileFormTargets.SELECT_TAG:
        this.selectTag(value);
        break;
      case uploadFileFormTargets.PUSH_IMAGES:
        this.pushImages();
        break;
      case fileListTargets.FORM_LOAD:
        this.loadGalleryImages();
        this.loadGalleryTags();
        break;
      case fileListTargets.SELECT_TAG:
        this.selectedTag = value;
        this.loadGalleryImages();
        break;
      case fileListTargets.SELECT_IMAGE_AS_PREVIEW:
        this.previewIndex = value;
        break;
      default:
        break;
    }
  };

  @observable images: Array<{fileKey: string; url: string}> = [];
  @observable imageTags: Array<{fileKey: string; text: string}> = [];
  @observable tags: Array<{title: string}> = [];
  @observable selectedImage: number = 0;

  @observable tagInput: {value: string; error: string | null} = {
    value: '',
    error: null,
  };

  @observable galleryImages: Array<{fileKey: string; url: string}> = [];
  @observable previewIndex: number = 0;

  @observable selectedTag: number = -1;

  private selectImages = async (files: FileList) => {
    if (files && files[0]) {
      const files_array = Array.from(files);
      const temp = [...this.images];
      files_array.forEach(async (file) => {
        const data = new FormData();
        data.append('files', file);

        try {
          const image = await this.fileManagementService.selectImages(data);
          temp.push(image);
          this.images = temp;
        } catch (error) {
          console.log(error);
        }
      });
    }
  };

  private removeImage = (fileKey: string) => {
    this.selectedImage = -1;
    this.images = this.images.filter((image) => image.fileKey !== fileKey);
  };

  private addImageTag = () => {
    if (this.selectedImage > -1) {
      const fileKey = this.images[this.selectedImage].fileKey;
      if (
        this.tags.findIndex((tag) => tag.title === this.tagInput.value) > -1
      ) {
        const temp = {...this.tagInput};
        temp.error = 'مقدار وارد شده در لیست دسته ها موجود است.';
        this.tagInput = temp;
      } else {
        const temp = [...this.imageTags];
        this.tags.push({title: this.tagInput.value});
        temp.push({fileKey: fileKey, text: this.tagInput.value});
        this.imageTags = temp;
        this.tagInput = {value: '', error: ''};
      }
    }
  };

  private removeImageTag = (index: number) => {
    this.imageTags = this.imageTags.filter((tag, i) => i !== index);
  };

  private selectTag = (index: number) => {
    const currentImageTags = this.imageTags.filter(
      (tag) => tag.fileKey === this.images[this.selectedImage].fileKey,
    );

    if (
      currentImageTags.findIndex((tag) => tag.text === this.tags[index].title) >
      -1
    ) {
      this.imageTags = this.imageTags.filter(
        (imageTag) =>
          !(
            imageTag.text == this.tags[index].title &&
            imageTag.fileKey == this.images[this.selectedImage].fileKey
          ),
      );
    } else {
      const temp = [...this.imageTags];
      temp.push({
        text: this.tags[index].title,
        fileKey: this.images[this.selectedImage].fileKey,
      });

      this.imageTags = temp;
    }
  };

  private pushImages = async () => {
    try {
      await this.fileManagementService.pushImages(this.images, this.imageTags);
    } catch (error) {
      console.log(error);
    }
  };

  private loadGalleryImages = async () => {
    const params: IGetFileTagQuery = {
      Tag: this.selectedTag > -1 ? this.tags[this.selectedTag].title : null,
    };
    try {
      this.galleryImages = await this.fileManagementService.loadGalleryImages(
        params,
      );
    } catch (error) {
      console.log(error);
    }
  };

  private loadGalleryTags = async () => {
    try {
      this.tags = await this.fileManagementService.loadGalleryTags();
    } catch (error) {
      console.log(error);
    }
  };
}

export interface InjectedFileManagementStore {
  fileManagement: FileManagement;
}
