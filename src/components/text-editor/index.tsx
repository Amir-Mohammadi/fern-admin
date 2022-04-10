import React from 'react';

import './text-editor.scss'; // don`t change this line to: import styles from './text-editor.module.scss'. we know, you know everything

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Direction from 'ckeditor5-direction/src/direction';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Link from '@ckeditor/ckeditor5-link/src/link';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle';

import {MyCustomUploadAdapterPlugin} from '../../utils/MyUploadAdapter';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export type TextEditorProps = Props;

const TextEditor: React.FC<TextEditorProps> = (props) => {
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    // plugins: [ Alignment],
    language: {
      // The UI will be English.
      ui: 'en',

      // But the content will be edited in Arabic.
      content: 'fa',
    },
    resize_enabled: true,

    fontSize: {
      options: [9, 11, 13, 'default', 17, 19, 21],
      supportAllValues: true,
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    link: {
      decorators: {
        openInNewTab: {
          mode: 'manual',
          label: 'Open in a new tab',
          defaultValue: true, // This option will be selected by default.
          attributes: {
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
      },
    },
    image: {
      styles: ['alignLeft', 'alignCenter', 'alignRight'],

      // Configure the available image resize options.
      resizeOptions: [
        {
          name: 'resizeImage:original',
          label: 'Original',
          value: null,
        },
        {
          name: 'resizeImage:50',
          label: '50%',
          value: '50',
        },
        {
          name: 'resizeImage:75',
          label: '75%',
          value: '75',
        },
      ],
      toolbar: [
        'imageStyle:alignLeft',
        'imageStyle:alignCenter',
        'imageStyle:alignRight',
        '|',
        'resizeImage',
        'imageTextAlternative',
        '|',
        'linkImage',
      ],
    },
    imageUpload: {},
    plugins: [
      Image,
      PasteFromOffice,
      Essentials,
      Paragraph,
      Bold,
      Italic,
      Alignment,
      Direction,
      Heading,
      ImageToolbar,
      ImageCaption,
      ImageStyle,
      ImageResize,
      LinkImage,
      Font,
      Link,
      AutoLink,
      Table,
      TableToolbar,
      ListStyle,
      ImageInsert,
    ],
    extraPlugins: [MyCustomUploadAdapterPlugin],

    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      '|',
      'alignment',
      'direction',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'linkImage',
      '|',
      'fontSize',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'insertTable',
      'imageInsert',
      'undo',
      'redo',
    ],
  };
  return (
    <div className={'container'}>
      <CKEditor
        config={config}
        editor={ClassicEditor}
        data={props.value}
        onReady={(editor: any) => {
          // You can store the "editor" and use when it is needed.
        }}
        onChange={(event: any, editor: {getData: () => any}) => {
          const data = editor.getData();
          props.onChange(data);
        }}
        onBlur={(event: any, editor: any) => {}}
        onFocus={(event: any, editor: any) => {}}
      />
    </div>
  );
};

export default TextEditor;
