import api from '../../api';
import {IGetFile, IGetFileTag, IGetFileTagQuery} from '../../api/models';
import {STATIC_FILE, STATIC_TEMP_FILE} from '../../utils/statics';

export default class FileManagementService {
  async selectImages(data: FormData): Promise<{fileKey: string; url: string}> {
    try {
      const res = await api.v1.fileUpload.upload(data);

      return {
        fileKey: res.data[0],
        url: `${STATIC_TEMP_FILE}${res.data[0]}`,
      };
    } catch (error) {
      throw error;
    }
  }

  async pushImages(
    images: Array<{fileKey: string; url: string}>,
    imageTags: Array<{
      fileKey: string;
      text: string;
    }>,
  ) {
    try {
      images.forEach(async (image) => {
        const storeRes = await api.v1.fileUpload.store(image.fileKey);
        if (storeRes.status == 201) {
          imageTags.forEach((tag) => {
            if (tag.fileKey === image.fileKey) {
              api.v1.fileUpload.createFileTag(tag, tag.fileKey);
            }
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async loadGalleryImages(
    params: IGetFileTagQuery,
  ): Promise<Array<{fileKey: string; url: string}>> {
    try {
      const res = await api.v1.fileUpload.getFiles(params);
      return this.fileResponseToGalleryImage(res.data);
    } catch (error) {
      throw error;
    }
  }

  async loadGalleryTags(): Promise<Array<{title: string}>> {
    try {
      const res = await api.v1.fileUpload.getTags();
      return this.fileTagResponseToDropdownList(res.data);
    } catch (error) {
      throw error;
    }
  }

  private fileResponseToGalleryImage(
    files: Array<IGetFile>,
  ): Array<{fileKey: string; url: string}> {
    const galleryImages: Array<{fileKey: string; url: string}> = [];

    files.forEach((file) => {
      galleryImages.push({
        fileKey: file.id,
        url: STATIC_FILE(file.id, file.row_version.replace('+', '%2B')),
      });
    });

    return galleryImages;
  }

  private fileTagResponseToDropdownList(
    fileTags: Array<IGetFileTag>,
  ): Array<{title: string}> {
    const dropdown: Array<{title: string}> = [];
    fileTags.forEach((tag) => {
      dropdown.push({title: tag.text});
    });
    return dropdown;
  }
}
