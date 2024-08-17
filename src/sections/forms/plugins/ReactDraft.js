// import { useState } from 'react';
import PropTypes from 'prop-types';

// third-party
// import { Editor } from 'react-draft-wysiwyg';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
// import { ContentState, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// ==============================|| EDITOR - DRAFT ||============================== //

const ReactDraft = ({ value, setValue }) => {
  const defaultFonts = ['Arial', 'Poppins'];

  const sortedFontOptions = [
    'Logical',
    'Salesforce Sans',
    'Garamond',
    'Sans-Serif',
    'Serif',
    'Times New Roman',
    'Helvetica',
    ...defaultFonts
  ].sort();

  return (
    <SunEditor
      placeholder="Please type here..."
      setContents={value}
      onChange={setValue}
      setOptions={{
        buttonList: [
          ['undo', 'redo'],
          ['font', 'fontSize'],
          ['paragraphStyle', 'blockquote'],
          ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
          ['fontColor', 'hiliteColor'],
          ['align', 'list', 'lineHeight'],
          ['outdent', 'indent'],

          ['table', 'horizontalRule', 'link', 'image', 'video'],
          // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
          // ['imageGallery'], // You must add the "imageGalleryUrl".
          ['fullScreen', 'showBlocks', 'codeView'],
          ['preview', 'print'],
          ['removeFormat']

          // ['save', 'template'],
          // '/', Line break
        ], // Or Array of button list, eg. [['font', 'align'], ['image']]
        defaultTag: 'div',
        minHeight: '300px',
        showPathLabel: false,
        font: sortedFontOptions
      }}
    />
  );
};

export default ReactDraft;

ReactDraft.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func
};
