
import React, { Component } from "react";
import {Modifier, Editor, EditorState, CompositeDecorator, convertFromRaw} from "draft-js";
import axios from "axios"
import { withCookies } from 'react-cookie';
import './styles.css';

class TextPane extends Component {

  constructor(props) {
    super(props);
    const cookies = this.props.cookies;
    this.filename = cookies.get('fileName');
    this.repetition = cookies.get('repetition');
    this.baseUri = "http://localhost:8000/palabras";
    this.state = {editorState: EditorState.createEmpty()};
    this.styleMap = {
      'marked': {
        'backgroundColor': '#faed27',
      }
    };
  };

  focus = async () => {
    function getEntityStrategy() {
      return function(contentBlock, callback, contentState) {
        contentBlock.findEntityRanges(
          (character) => {
            const entityKey = character.getEntity();
            return (entityKey !== null);
          },
          callback
        );
      };
     };
    
    const TokenSpan = (props) => {
      const style = this.styleMap.marked;
      return (
        <span data-offset-key={props.offsetKey} style={style}>
          {props.children}
        </span>
      );
    };

    const decorator = new CompositeDecorator([
      {
        strategy: getEntityStrategy(),
        component: TokenSpan,
      },
    ]);

    this.editor.focus();
    const cookies = this.props.cookies;
    this.filename = cookies.get('fileName');
    // let paragraphs = await this.getRawDocument();
    // let newEditorState = EditorState.createEmpty();
    // for (const p of paragraphs.reverse()) {
    //   newEditorState = this.addParagraph(p, newEditorState)
    // };
    // let rawContent = await this.getRawBlocks();
    let rawContent = [];
    this.repetition = cookies.get('repetition');
    if (this.repetition !== null) {
      rawContent = await this.getBlocksMarking(this.repetition)}
    else {
      rawContent = await this.getRawBlocks()};
    const blocks = convertFromRaw(rawContent);
    let newEditorState = EditorState.createWithContent(blocks, decorator);
    this.setState({editorState: newEditorState});
  };

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  addParagraph(text, editorState){
    const contentState = editorState.getCurrentContent();
    const newContents = Modifier.insertText(Modifier.splitBlock(contentState, editorState.getSelection()), editorState.getSelection(), text);
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: newContents}
    );
    return newEditorState
  };
  
  handleError(msg, error){
    console.log(msg);
  };

  async getRawDocument() {
    try {
        const response = await axios.get(this.baseUri + '/paragraphs/' + this.filename);
        const array = response.data;
        return array

     }
    catch (error) {this.handleError('Cannot get raw document', error)}
};
  
async getRawBlocks() {
  try {
      const response = await axios.get(this.baseUri + '/blocks/' + this.filename);
      const array = response.data;
      return array

   }
  catch (error) {this.handleError('Cannot get raw document', error)}
}

async getBlocksMarking(aString) {
  try {
      const response = await axios.get(this.baseUri + '/blocks/' + this.filename + '/marking/' + aString);
      return response.data;
   }
  catch (error) {this.handleError('Cannot get raw document', error)}
};

 render(){    
    return (
      <div className="TextPane" onClick={this.focus}  style={({ display: "flex" })}>
        <main>
          <Editor
            customStyleMap={this.styleMap}
            editorState = {this.state.editorState}
            onChange={this.onChange}
            placeholder="Enter some text..."
            readOnly= {true}
            ref={element => {
              this.editor = element;
            }}
            />
          </main>
      </div>
    );
  }
};

export default withCookies(TextPane)