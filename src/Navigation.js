
import React, { Component } from "react";
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
    this.index = 0;
  };

  handleError(msg, error){
    console.log(msg);
  };

  before(i) {
    if (this.selected == null) {return ''};
    if (i == null) {return ''};
    if (i <= 1) {return ''};
    return this.selected.increments[i-1];
  };

  after(i) {
    if (this.selected == null) {return ''}
    else {
      if (i == null) {return ''}
      else {
        if (i >= this.selected.times) {return ''}
        else {return this.selected.increments[i-1]}
      }
    };
  };

  upClicked = () => {
    if (this.index <= 1) {return};
    let i = this.index - 1;
    this.index = i;
    const cookies = this.props.cookies;
    cookies.set('index', this.index);
  };

  downClicked = () => {
    var inc = 100;
    var repetition = this.selected;
    while ((this.index < (repetition.times - 1)) && (inc > 50) ) {
      let i = (this.index + 1);
      this.index = i;
      const cookies = this.props.cookies;
      cookies.set('index', this.index);
      if (this.index <(repetition.times - 1) ) {
        inc = repetition.increments[this.index - 1];
      }
    }
  };

  focus = async () => {
    const cookies = this.props.cookies;
    if (this.selected?.fragment !== cookies.get('repetition')?.fragment) {
      this.index = 1; 
      cookies.set('index', 1)};
    this.selected = cookies.get('repetition');
    if (this.selected !== null) {
      if(this.index == null) {
        cookies.set('index', 1);
        this.index = 1;
      } 
    }
  };

  render() {

    return (
      <div className="Navigation" onClick={this.focus}>
        <button type="button" class="btn btn-primary btn-block" onClick={this.upClicked}>
          <span class="fa-solid fa-circle-arrow-up"></span> Up
        </button>
        <p />
        <p>Index</p>
        <input name="index" value={this.index + "/" + this.selected?.times} />
        <p />
        <p>Before</p>
        <input name="before" value={this.before(this.index)} />
        <p />
        <p>After</p>
        <input name="after" value={this.after(this.index)} />
        <p />
        <button type="button" class="btn btn-primary btn-block" onClick={this.downClicked}>
          <span class="fa-solid fa-circle-arrow-down"></span> Down
        </button>
      </div>
    );
  }
};

export default withCookies(Navigation);