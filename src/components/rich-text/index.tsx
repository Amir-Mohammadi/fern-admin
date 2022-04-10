import {Component} from 'react';
import styles from './rich-text.module.scss';
import detectBrowserLanguage from 'detect-browser-language';

import ContentEditable from 'react-contenteditable';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faBold,
  faCheck,
  faItalic,
  faLink,
  faListUl,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

type RichTExtEditorProps = {};
type RichTExtEditorState = {
  html: string;
  hyperlinkBX: {
    status: boolean;
    value: string;
    Text: Selection | string | undefined | null;
    newTab: boolean;
  };
};

class RichTExtEditor extends Component<
  RichTExtEditorProps,
  RichTExtEditorState
> {
  constructor(props) {
    super(props);

    this.state = {
      html: ``,
      hyperlinkBX: {
        status: false,
        value: 'http://google.com',
        Text: '',
        newTab: false,
      },
    };
  }

  handleChange = (target) => {
    this.setState({html: target.value});
  };

  setHyperlinkBX = () => {
    const temp = {...this.state.hyperlinkBX};
    temp.Text = document.getSelection();
    temp.status = !temp.status;
    this.setState({hyperlinkBX: temp});
  };

  handleHyperlinkInputChange = (value: string) => {
    const temp = {...this.state.hyperlinkBX};
    temp.value = value;
    this.setState({hyperlinkBX: temp});
  };
  handleHyperlinkCheckboxChange = (value: boolean) => {
    const temp = {...this.state.hyperlinkBX};
    temp.newTab = value;
    this.setState({hyperlinkBX: temp});
  };

  addLink = () => {
    document.execCommand(
      'insertHTML',
      false,
      `<a href="${this.state.hyperlinkBX.value}" target=${
        this.state.hyperlinkBX.newTab ? '_blank' : null
      } rel="noopener noreferrer">${this.state.hyperlinkBX.Text}</a>`,
    );
  };

  toggleBold() {
    document.execCommand('bold', false);
  }

  toggleItalic() {
    document.execCommand('italic', false);
  }

  componentDidMount() {
    //document.execCommand('defaultParagraphSeparator', true);
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.actionBar}>
          <div className={styles.action}>
            <button
              title={'Bold'}
              onClick={(evt) => {
                evt.preventDefault();
                this.toggleBold();
              }}>
              <FontAwesomeIcon icon={faBold} />
            </button>
          </div>
          <div className={styles.action}>
            <button title={'Italic'} onClick={() => this.toggleItalic()}>
              <FontAwesomeIcon icon={faItalic} />
            </button>
          </div>
          <div className={styles.action}>
            <button onClick={this.setHyperlinkBX}>
              <FontAwesomeIcon icon={faLink} />
            </button>

            {this.state.hyperlinkBX.status && (
              <div className={styles.hyperlinkBX}>
                <div className={styles.form}>
                  <input
                    type="text"
                    value={this.state.hyperlinkBX.value}
                    onChange={({target}) => {
                      this.handleHyperlinkInputChange(target.value);
                    }}
                  />
                  <button>
                    <FontAwesomeIcon icon={faCheck} onClick={this.addLink} />
                  </button>
                  <button>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <span>
                  <input
                    type="checkbox"
                    onChange={({target}) => {
                      this.handleHyperlinkCheckboxChange(target.checked);
                    }}
                  />
                  open in new tab
                </span>
              </div>
            )}
          </div>
          <div className={styles.action}>
            <button>
              <FontAwesomeIcon icon={faListUl} />
            </button>
          </div>
        </div>
        <div
          className={styles.editor}
          id="sampleEditor"
          contentEditable={true}
          onChange={({target}) => this.handleChange(target)}
          onFocus={() => {
            //document.execCommand('bold', true);
          }}
          dangerouslySetInnerHTML={{__html: this.state.html}}></div>
        {/* <h3>actions</h3>
        <EditButton cmd="italic" />
        <EditButton cmd="bold" />
        <EditButton cmd="formatBlock" arg="h1" name="heading" />
        <EditButton
          cmd="createLink"
          arg="https://github.com/lovasoa/react-contenteditable"
          name="hyperlink"
        /> */}
      </div>
    );
  }
}

function EditButton(props) {
  return (
    <button
      key={props.cmd}
      onMouseDown={(evt) => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
      }}>
      {props.name || props.cmd}
    </button>
  );
}

export default RichTExtEditor;
