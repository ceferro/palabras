
import React, { Component } from "react";
import axios from "axios"
import { withCookies } from 'react-cookie';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import './styles.css'

class Navigation extends Component {
  constructor(props){
    super(props);
    this.baseUri = "http://localhost:8000/palabras";
    const cookies = this.props.cookies;
    this.filename = cookies.get('fileName');
    this.selected = cookies.get('repetition');
    this.index = cookies.get('index');
    this.state = {index: 0, before: 0, after:0, count: 0 };
  };

  handleError(msg, error){
    console.log(msg);
  };

  async getRepetitions() {
    try {
        const response = await axios.get(this.baseUri + '/repetitions/' + this.filename);
        return response.data;
   }
   catch (error) {this.handleError('Cannot get repetitions from ' + this.filename, error)}
};

focus = async () => {
  const cookies = this.props.cookies;
  this.filename = cookies.get('fileName');
  this.selected = cookies.get('repetition');
  let index = await this.getRepetitionIndex();
  this.setState({index: index});
};

  render() {

    return (
      <div className="Navigation" onClick={this.focus}>
        <button type="button" class="btn btn-primary btn-block">
          <span class="fa-solid fa-circle-arrow-up"></span> Up
        </button>
        <p>Index</p>
        <input name="index" defaultValue={this.index + "/" + this.selected.count} />
        <p>Before</p>
        <p>After</p>
        <button type="button" class="btn btn-primary btn-block">
          <span class="fa-solid fa-circle-arrow-down"></span> Down
        </button>
      </div>
    );
  }
};

export default withCookies(Navigation);