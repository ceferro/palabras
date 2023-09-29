
import React, { Component } from "react";
import axios from "axios"
import { withCookies } from 'react-cookie';

class FileInput extends Component {
  constructor(props){
    super(props);
    this.baseUri = "http://localhost:8000/palabras";
  };

  handleError(msg, error){
    console.log(msg);
  };

  readFile(file){
    return new Promise(function(resolve, reject) {
    let reader = new FileReader(); 
    reader.readAsText(file,'iso-8859-15');
    reader.onload = function() {
      resolve (reader.result );
    };
    reader.onerror = function() {
      console.log(reader.error);
    };})
  };

  async setFilename(file) {
    let text = await this.readFile(file);
    try {
        const response = await axios.post(this.baseUri + '/filename/' + file.name, {text: text});
        return response.data;
   }
   catch (error) {this.handleError('Cannot set the filename ' + file.name, error)}
};

  handle = e => {
    const file = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(file),
      originalFile: file,
      fileName: file.name
    });
    this.setFilename(file);
    const cookies = this.props.cookies;
    cookies.set('originalLink', URL.createObjectURL(file), { path: '/' });
    cookies.set('originalFile', file, { path: '/' });
    cookies.set('fileName', file.name, { path: '/' });
  };

  render() {
    return (
      <div className="FileInput">
        <p>Choose a plain text file to analyze</p>
        <input
          type="file"
          accept="text/plain"
          className="mt-2 btn btn-dark w-75"
          onChange={e => this.handle(e)}
        />
      </div>
    );
  }
};

export default withCookies(FileInput);