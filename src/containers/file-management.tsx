import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import FileManagementScreen from '../screens/file-management';
import {InjectedFileManagementStore} from '../stores';

export type FileManagementContainerProps = InjectedFileManagementStore;

@inject('fileManagement')
@observer
class FileManagement extends Component<FileManagementContainerProps> {
  render() {
    return (
      <div>
        <FileManagementScreen
          uploadForm={{
            action: this.props.fileManagement.handleActions,
            imageTags: this.props.fileManagement.imageTags,
            images: this.props.fileManagement.images,
            selectedImage: this.props.fileManagement.selectedImage,
            tags: this.props.fileManagement.tags,
            tagInput: this.props.fileManagement.tagInput,
          }}
          fileList={{
            action: this.props.fileManagement.handleActions,
            images: this.props.fileManagement.galleryImages,
            previewIndex: this.props.fileManagement.previewIndex,
            selectedTag: this.props.fileManagement.selectedTag,
            tags: this.props.fileManagement.tags,
          }}
        />
      </div>
    );
  }
}

export default FileManagement as any;
