import React, {useState} from 'react';
import AccordionList from '../../components/accordion-list';
import UploadFileForm, {
  UploadFileFormProps,
} from '../../components/upload-file-form';
import FileList, {FileListProps} from '../../components/file-list';

import styles from './file-management.module.scss';

interface Props {
  uploadForm: UploadFileFormProps;
  fileList: FileListProps;
}

export type FileManagementProps = Props;

const FileManagement: React.FC<FileManagementProps> = (props) => {
  const [accordionIndex, setState] = useState(0);
  return (
    <div className={styles.container}>
      <AccordionList
        data={[
          {
            title: 'آپلود فایل',
            content: <UploadFileForm {...props.uploadForm} />,
          },
          {
            title: 'لیست فایلها',
            content: <FileList {...props.fileList} />,
          },
        ]}
        selectedIndex={accordionIndex}
        onClick={(i) => {
          setState(i);
        }}
      />
    </div>
  );
};

export default FileManagement;
